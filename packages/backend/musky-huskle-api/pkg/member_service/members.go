package member

import (
	"log"

	internal "github.com/DanielKenichi/musky-huskle-api/pkg"
	"github.com/DanielKenichi/musky-huskle-api/pkg/models"
	"gorm.io/gorm"
)

type MembersService struct {
	Db           *gorm.DB
	InternalChan chan PickEvent
	Time         internal.Time
}

func New(db *gorm.DB) *MembersService {
	return &MembersService{
		Db:           db,
		InternalChan: make(chan PickEvent),
		Time:         &Time{},
	}
}

/*
When a member is created for the game, it must be put into the shuffle bag
A member must always be either in the shuffle bag or into the wait queue exclusively.
*/
func (s *MembersService) CreateMember(member *models.Member) error {

	result := s.Db.Create(&member)

	if result.Error != nil {
		log.Printf("Failed to create member")

		return result.Error
	}

	shuffleBagEntry := models.ShuffleBag{
		MemberID: member.ID,
	}

	result = s.Db.Create(&shuffleBagEntry)

	if result.Error != nil {
		log.Printf("Failed inserting new member on shuffle bag")

		return result.Error
	}

	return nil
}

func (s *MembersService) UpdateMember(updatedMember *models.Member) error {

	var member models.Member

	result := s.Db.Where("name = ? ", updatedMember.Name).Find(&member)

	if result.Error != nil {
		log.Printf("Failed to retrieve member %s to update", updatedMember.Name)

		return result.Error
	}

	updatedMember.ID = member.ID
	updatedMember.CreatedAt = member.CreatedAt

	result = s.Db.Save(&updatedMember)

	if result.Error != nil {
		log.Printf("Failed updating member %s", updatedMember.Name)

		return result.Error
	}

	return nil
}

/*
When a memebr is deleted, its shuffle bag or wait queue entry should be
deleted in cascade
*/
func (s *MembersService) DeleteMember(memberToDelete *models.Member) error {

	var member models.Member

	result := s.Db.Where("name = ? ", memberToDelete.Name).Delete(&member)

	if result.Error != nil {
		log.Printf("Error trying to delete member %s", memberToDelete.Name)

		return result.Error
	}

	return nil
}

func (s *MembersService) GetMember(memberName string) (*models.Member, error) {
	var member models.Member

	result := s.Db.Where("name = ?", memberName).Find(&member)

	if result.Error != nil {
		log.Printf("Failed to retrieve members")

		return nil, result.Error
	}

	return &member, nil
}

func (s *MembersService) GetMemberOfDay() (*models.Member, error) {
	formatedDate := s.Time.Now().Local().Format("2006-01-02")

	memberOfDay := models.MemberOfDay{}

	Log.Print("Verifying for member of day")

	result := s.Db.Where("date = ?", formatedDate).First(&memberOfDay)

	if result.Error != nil {
		return nil, result.Error
	}

	member := models.Member{}

	result = s.Db.Where("name = ?", memberOfDay.MemberName).First(&member)

	if result.Error != nil {
		return nil, result.Error
	}

	return &member, nil
}
