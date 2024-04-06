package members

import (
	"log"

	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"gorm.io/gorm"
)

type MembersService struct {
	db *gorm.DB
}

func New(db *gorm.DB) *MembersService {
	return &MembersService{db: db}
}

func (s *MembersService) CreateMember(member *models.Member) error {

	result := s.db.Create(&member)

	if result.Error != nil {
		log.Printf("Failed to create member")

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
