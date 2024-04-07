package members

import (
	"context"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"gorm.io/gorm"
)

type PickEvent struct{}

func (s *MembersService) PickTimer(ctx context.Context) {

	for {
		currentTime := time.Now()

		year, month, day := time.Time.Date(currentTime)

		startOfDay := time.Date(year, month, day, 0, 0, 0, 0, currentTime.Location())

		elapsedSeconds := int(currentTime.Sub(startOfDay).Seconds())

		timeUntilMidnight := 86400 - elapsedSeconds

		pickTimer := time.NewTimer(time.Second * time.Duration(timeUntilMidnight))

		<-pickTimer.C

		s.internalChan <- PickEvent{}

		select {
		case s.internalChan <- PickEvent{}:
		case <-ctx.Done():
			log.Printf("Cancel Signal received. Exiting Picking Timer")
			return
		}
	}

}

func (s *MembersService) MemberPicker(ctx context.Context) {

	for {
		//TODO: Set member of day if there is no member for current day
		<-s.internalChan

		shuffleBag, err := GetShuffledBag(s.db)

		if err != nil {
			log.Fatalf("Error While Picking Member for the day. Manual Pick required")
			continue
		}

		memberOfDay, err := PickMemberOfDay(s.db, shuffleBag)

		if err != nil {
			log.Fatalf("Error While Picking Member for the day. Manual Pick required")
			continue
		}

		err = SetMemberOfDay(s.db, memberOfDay)

		if err != nil {
			log.Fatalf("Error while Picking Member for the day. Manual Pick required")
			continue
		}

		select {
		case <-s.internalChan:
		case <-ctx.Done():
			log.Printf("Cancel Signal received. Exiting Member Picker")
			return
		}
	}
}

func SetMemberOfDay(db *gorm.DB, memberOfDay *models.Member) error {
	entry := &models.MemberOfDay{
		MemberID:   memberOfDay.ID,
		MemberName: memberOfDay.Name,
	}

	result := db.Save(entry)

	if result.Error != nil {
		log.Fatalf("Failed Saving entry on member Of day: %v", result.Error)
		return result.Error
	}

	var lastQueueEntry models.WaitQueue

	result = db.Order("Position desc").First(&lastQueueEntry)

	if result.Error != nil {
		log.Fatalf("Failed Getting last wait queue entry: %v", result.Error)
		return result.Error
	}

	queueEntry := models.WaitQueue{
		MemberID: memberOfDay.ID,
		Position: lastQueueEntry.Position + 1,
	}

	result = db.Save(queueEntry)

	if result.Error != nil {
		log.Fatalf("Failed saving new entry on wait queue: %v", result.Error)
	}

	return nil
}

func PickMemberOfDay(db *gorm.DB, shuffleBag []models.ShuffleBag) (*models.Member, error) {
	selectedEntry, shuffleBag := shuffleBag[0], shuffleBag[1:]

	memberID := selectedEntry.MemberID

	var member models.Member

	result := db.Find(&member, memberID)

	if result.Error != nil {
		log.Fatalf("Failed to retrieve member from shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	result = db.Where("MemberID = ?", memberID).Delete(&selectedEntry)

	if result.Error != nil {
		log.Fatalf("Failed to delete member from shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	var membersCount int64

	db.Table("members").Count(&membersCount)

	if len(shuffleBag) < (int(membersCount) / 2) {
		err := RefillShuffleBag(db, shuffleBag, int(membersCount))

		if err != nil {
			log.Printf("Error while refilling shuffle bag: %v", err)
		}
	}

	return &member, nil
}

func RefillShuffleBag(db *gorm.DB, shuffleBag []models.ShuffleBag, membersCount int) error {
	var waitQueueEntry models.WaitQueue

	result := db.Order("Position asc").First(&waitQueueEntry)

	membersAdded := 0

	if result.Error != nil {
		message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
		return errors.New(message)
	}

	for len(shuffleBag) < (membersCount / 2) {
		shuffleBagEntry := models.ShuffleBag{
			MemberID: waitQueueEntry.MemberID,
		}

		shuffleBag = append(shuffleBag, shuffleBagEntry)

		result = db.Create(&shuffleBagEntry)

		if result != nil {
			message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}

		membersAdded += 1

		result = db.Where("MemberID = ?", waitQueueEntry.MemberID).Delete(&waitQueueEntry)

		if result.Error != nil {
			message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}

		result = db.Model(&models.WaitQueue{}).Where("Position > ?", 1).UpdateColumn("Position", gorm.Expr("Position - ?", 1))

		if result.Error != nil {
			message := fmt.Sprintf("Failed updating queue positions: %v", result.Error)
			return errors.New(message)
		}

		result = db.Order("Position asc").First(&waitQueueEntry)

		if result.Error != nil {
			message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}
	}

	return nil
}

func GetShuffledBag(db *gorm.DB) ([]models.ShuffleBag, error) {
	var shuffleBag []models.ShuffleBag

	result := db.Find(&shuffleBag)

	if result.Error != nil {
		log.Fatalf("Failed retrieving shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	if len(shuffleBag) == 0 {
		log.Fatalf("There is no members on shuffle bag")
		return nil, errors.New("Empty Shuffle Bag")
	}

	rand.NewSource(time.Now().UnixNano())
	rand.Shuffle(len(shuffleBag), func(i, j int) { shuffleBag[i], shuffleBag[j] = shuffleBag[j], shuffleBag[i] })

	return shuffleBag, nil
}
