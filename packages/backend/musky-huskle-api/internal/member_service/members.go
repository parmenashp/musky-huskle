package members

import (
	"log"

	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"gorm.io/gorm"
)

type MembersService struct {
	db           *gorm.DB
	internalChan chan PickEvent
}

func New(db *gorm.DB) *MembersService {
	return &MembersService{db: db, internalChan: make(chan PickEvent)}
}

func (s *MembersService) CreateMember(member *models.Member) error {

	result := s.db.Create(&member)

	if result.Error != nil {
		log.Printf("Failed to create member")

		return result.Error
	}

	shuffleBagEntry := models.ShuffleBag{
		MemberID: member.ID,
	}

	result = s.db.Create(&shuffleBagEntry)

	if result.Error != nil {
		log.Printf("Failed inserting new member on shuffle bag")

		return result.Error
	}

	return nil
}

func (s *MembersService) UpdateMember(updatedMember *models.Member) error {

	var member models.Member

	result := s.db.Where("Name = ? ", member.Name).Find(&member)

	if result.Error != nil {
		log.Printf("Failed to retrieve member %s to update", updatedMember.Name)

		return result.Error
	}

	updatedMember.ID = member.ID

	result = s.db.Save(&updatedMember)

	if result.Error != nil {
		log.Printf("Failed updating member %s", updatedMember.Name)

		return result.Error
	}

	return nil
}

func (s *MembersService) DeleteMember(memberToDelete *models.Member) error {

	var member models.Member

	result := s.db.Where("Name = ? ", memberToDelete.Name).Delete(&member)

	if result.Error != nil {
		log.Printf("Error trying to delete member %s", memberToDelete.Name)

		return result.Error
	}

	return nil
}

func (s *MembersService) GetMembers(membersName []string) ([]models.Member, error) {
	var members []models.Member

	result := s.db.Where("Name IN ?", membersName).Find(&members)

	if result.Error != nil {
		log.Printf("Failed to retrieve members")

		return nil, result.Error
	}

	return members, nil
}
