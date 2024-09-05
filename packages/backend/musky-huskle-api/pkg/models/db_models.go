package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	RIGHT      = "right"
	WRONG      = "wrong"
	PARTIAL    = "partial"
	WRONG_UP   = "wrong up"
	WRONG_DOWN = "wrong down"
)

// TODO: fix multivalued fields such as "fursonaSpecied"
type Member struct {
	ID              uint `json:"id" gorm:"primarykey"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
	BirthDate       string        `json:"birth_date" gorm:"column:birth_date"`
	GenreIdentity   string        `json:"genre_identity" gorm:"column:genre_identity"`
	Age             uint8         `json:"age"`
	FursonaSpecies  string        `json:"fursona_species" gorm:"column:fursona_species"`
	Color           string        `json:"color"`
	Occupation      string        `json:"occupation"`
	Sexuality       string        `json:"sexuality"`
	Sign            string        `json:"sign"`
	MemberSince     int           `json:"member_since" gorm:"column:member_since"`
	AvatarUrl       string        `json:"avatar_url"`
	Name            string        `json:"name" gorm:"unique"`
	SelectedDays    []MemberOfDay `json:"selected_days" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ShuffleBagEntry ShuffleBag    `json:"shuffle_bag_entry" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	WaitQueueEntry  WaitQueue     `json:"wait_queue_entry" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type MemberOfDay struct {
	gorm.Model
	MemberID   uint
	MemberName string
	Date       time.Time `gorm:"default:(CURRENT_DATE)"`
}

type ShuffleBag struct {
	ID        uint `json:"id" gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	MemberID  uint `json:"member_id" gorm:"unique"`
}

type WaitQueue struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	MemberID  uint `gorm:"unique"`
	Position  uint `gorm:"unique"`
}
