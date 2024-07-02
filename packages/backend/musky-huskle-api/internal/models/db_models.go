package models

import (
	"time"

	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	GenreIdentity   string        `json:"genreIdentity" gorm:"column:genre_identity"`
	Age             uint8         `json:"age"`
	FursonaSpecies  string        `json:"fursonaSpecies" gorm:"column:fursona_species"`
	Color           string        `json:"color"`
	Occupation      string        `json:"occupation"`
	Sexuality       string        `json:"sexuality"`
	Sign            string        `json:"sign"`
	MemberSince     string        `json:"memberSince" gorm:"column:member_since"`
	AvatarUrl       string        `json:"avatarUrl"`
	Name            string        `json:"name" gorm:"unique"`
	SelectedDays    []MemberOfDay `json:"selectedDays" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ShuffleBagEntry ShuffleBag    `json:"shuffleBagEntry" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	WaitQueueEntry  WaitQueue     `json:"waitQueueEntry" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type MemberOfDay struct {
	gorm.Model
	MemberID   uint
	MemberName string
	Date       time.Time `gorm:"default:(DATE('now'))"`
}

type ShuffleBag struct {
	gorm.Model
	MemberID uint `gorm:"unique"`
}

type WaitQueue struct {
	gorm.Model
	MemberID uint `gorm:"unique"`
	Position uint `gorm:"unique"`
}
