package members

import (
	"context"
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

func (s *MembersService) CreateMember(ctx context.Context, member *models.Member) error {

	result := s.db.Create(&member)

	if result.Error != nil {
		log.Printf("Failed to create member")

		return result.Error
	}

	return nil
}
