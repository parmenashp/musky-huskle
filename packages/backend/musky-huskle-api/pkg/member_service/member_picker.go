package member

import (
	"context"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/DanielKenichi/musky-huskle-api/pkg/models"
	"gorm.io/gorm"
)

var (
	WarnLog = log.New(os.Stderr, "[WARNING] ", log.LstdFlags|log.Lmsgprefix)
	ErrLog  = log.New(os.Stderr, "[ERROR] ", log.LstdFlags|log.Lmsgprefix)
	Log     = log.New(os.Stdout, "[INFO]", log.LstdFlags|log.Lmsgprefix)
)

type PickEvent struct{}

/*
Pick Events should be fired at midnight of local timezone
*/
func (s *MembersService) PickTimer(ctx context.Context) {
	Log.Print("Pick Timer started")
	for {
		select {
		case <-ctx.Done():
			WarnLog.Printf("Cancel Signal received. Exiting Picking Timer")
			return
		default:
			currentTime := s.Time.Now()

			year, month, day := time.Time.Date(currentTime)

			startOfDay := s.Time.Date(year, month, day, 0, 0, 0, 0, currentTime.Location())

			elapsedSeconds := int(currentTime.Sub(startOfDay).Seconds())

			timeUntilMidnight := 86400 - elapsedSeconds

			pickTimer := s.Time.NewTimer(time.Second * time.Duration(timeUntilMidnight))

			<-pickTimer.C

			Log.Printf("Firing Pick Event")

			s.InternalChan <- PickEvent{}
		}
	}

}

/*
Picks a member to set as member of day every time a PickEvent is fired through internalchan
or if there is no member set for that day
*/

func (s *MembersService) MemberPicker(ctx context.Context) {

	Log.Printf("Member Picker routine started.")

	for {
		select {
		case <-ctx.Done():
			WarnLog.Printf("Cancel Signal received. Exiting Member Picker")
			return
		default:
			if !s.IsMemberOfDaySet(s.Db) {

				Log.Printf("No member of day is set. Picking member of day")

				shuffleBag, err := GetShuffledBag(s.Db)

				if err != nil {
					ErrLog.Printf("Error While Picking Member for the day. Manual Pick required: %v", err)
					<-s.InternalChan
					continue
				}

				memberOfDay, err := PickMemberOfDay(s.Db, shuffleBag)

				if err != nil {
					ErrLog.Printf("Error While Picking Member for the day. Manual Pick required: %v", err)
					<-s.InternalChan
					continue
				}

				err = s.SetMemberOfDay(s.Db, memberOfDay)

				if err != nil {
					ErrLog.Printf("Error while Picking Member for the day. Manual Pick required: %v", err)
					<-s.InternalChan
					continue
				}
			}

			<-s.InternalChan
		}
	}
}

func (s *MembersService) IsMemberOfDaySet(db *gorm.DB) bool {

	formatedDate := s.Time.Now().Local().Format("2006-01-02")

	memberOfDay := models.MemberOfDay{}

	Log.Print("Verifying for member of day")

	result := db.Where("date = ?", formatedDate).First(&memberOfDay)

	return result.Error == nil
}

/*
Every time a member is set for the day, they must enter into a wait queue
to be selected again
*/

func (s *MembersService) SetMemberOfDay(db *gorm.DB, memberOfDay *models.Member) error {

	currentTime := s.Time.Now()

	year, month, day := time.Time.Date(currentTime)

	date := s.Time.Date(year, month, day, 0, 0, 0, 0, currentTime.Location())

	entry := &models.MemberOfDay{
		MemberID:   memberOfDay.ID,
		MemberName: memberOfDay.Name,
		Date:       date,
	}

	Log.Printf("Setting %s as member of day", memberOfDay.Name)

	result := db.Save(entry)

	if result.Error != nil {
		ErrLog.Printf("Failed Saving entry on member Of day: %v", result.Error)
		return result.Error
	}

	var lastQueueEntry models.WaitQueue

	Log.Print("Retrieving Last Queue Entry")

	result = db.Order("Position desc").First(&lastQueueEntry)

	var lastPosition uint

	if result.Error == nil {
		lastPosition = lastQueueEntry.Position
	} else if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		lastPosition = 0
	} else {
		ErrLog.Printf("Failed Getting last wait queue entry: %v", result.Error)
		return result.Error
	}

	queueEntry := models.WaitQueue{
		MemberID: memberOfDay.ID,
		Position: lastPosition + 1,
	}

	Log.Printf("Inserting %s on WaitQueue", memberOfDay.Name)

	result = db.Save(&queueEntry)

	if result.Error != nil {
		ErrLog.Printf("Failed saving new entry on wait queue: %v", result.Error)
		return result.Error
	}

	return nil
}

/*
Given a shuffled bag, picks the first member of it.
The Bag must be refilled if there is less than half of participants in it.
Every member that refills the shuffle bag must exit the wait queue
*/
func PickMemberOfDay(db *gorm.DB, shuffleBag []models.ShuffleBag) (*models.Member, error) {
	selectedEntry, shuffleBag := shuffleBag[0], shuffleBag[1:]

	memberID := selectedEntry.MemberID

	var member models.Member

	Log.Printf("Retrieving member of Day with ID %d", memberID)

	result := db.Find(&member, memberID)

	if result.Error != nil {
		ErrLog.Printf("Failed to retrieve member from shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	Log.Printf("Removing %s from shufflebag", member.Name)
	result = db.Delete(&selectedEntry)

	if result.Error != nil {
		ErrLog.Printf("Failed to delete member from shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	var membersCount int64

	db.Table("members").Count(&membersCount)

	if len(shuffleBag) < (int(membersCount) / 2) {
		Log.Print("Refilling shuffle bag")
		err := RefillShuffleBag(db, shuffleBag, int(membersCount))

		if err != nil {
			ErrLog.Printf("Error while refilling shuffle bag: %v", err)
		}
	}

	return &member, nil
}

func RefillShuffleBag(db *gorm.DB, shuffleBag []models.ShuffleBag, membersCount int) error {
	var waitQueueEntry models.WaitQueue

	membersAdded := 0

	for len(shuffleBag) < (membersCount / 2) {

		Log.Print("Retrieving first wait queue entry")
		result := db.Order("position asc").First(&waitQueueEntry)

		if result.Error != nil {
			message := fmt.Sprintf("No memebers in queue after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}

		shuffleBagEntry := models.ShuffleBag{
			MemberID: waitQueueEntry.MemberID,
		}

		shuffleBag = append(shuffleBag, shuffleBagEntry)

		Log.Printf("Adding member with Id %d to Shuffle bag", shuffleBagEntry.MemberID)

		result = db.Create(&shuffleBagEntry)

		if result.Error != nil {
			message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}

		membersAdded += 1

		Log.Printf("Removing member with id %d from wait queue", waitQueueEntry.MemberID)
		result = db.Where("member_id = ?", waitQueueEntry.MemberID).Delete(&waitQueueEntry)

		if result.Error != nil {
			message := fmt.Sprintf("Error after adding %d members: %v", membersAdded, result.Error)
			return errors.New(message)
		}

		Log.Print("Updating Queue positions")
		result = db.Model(&models.WaitQueue{}).
			Where("position > ? ", uint(1)).
			UpdateColumn("position", gorm.Expr("position - ?", uint(1)))

		if result.Error != nil {
			message := fmt.Sprintf("Failed updating queue positions: %v", result.Error)
			return errors.New(message)
		}
	}

	return nil
}

/*
Retrieves the game's bag of members and shuffle it for member selection.
A shuffle bag must have at least four members, otherwise it's invalid
*/
func GetShuffledBag(db *gorm.DB) ([]models.ShuffleBag, error) {
	var shuffleBag []models.ShuffleBag

	Log.Print("Retrieving Shuffle Bag")

	result := db.Find(&shuffleBag)

	if result.Error != nil {
		ErrLog.Printf("Failed retrieving shuffle bag: %v", result.Error)
		return nil, result.Error
	}

	if len(shuffleBag) < 4 {
		WarnLog.Printf("There is not enough members on shuffle bag. At least 4 members is necessary to play.")
		return nil, errors.New("not enough members on shuffle bag")
	}

	Log.Print("Shuffling Bag")

	rand.NewSource(time.Now().UnixNano())
	rand.Shuffle(len(shuffleBag), func(i, j int) { shuffleBag[i], shuffleBag[j] = shuffleBag[j], shuffleBag[i] })

	return shuffleBag, nil
}
