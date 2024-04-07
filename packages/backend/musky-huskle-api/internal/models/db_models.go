package models

import (
	"time"

	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	GenreIdentity   string
	Age             uint8
	FursonaSpecies  string
	Color           string
	Occupation      string
	Sexuality       string
	Sign            string
	MemberSince     string
	AvatarUrl       string
	Name            string        `gorm:"unique"`
	SelectedDays    []MemberOfDay `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ShuffleBagEntry ShuffleBag    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	WaitQueueEntry  WaitQueue     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type MemberOfDay struct {
	gorm.Model
	MemberID   uint
	MemberName string
	Date       time.Time `gorm:"default:(DATE('now'))"`
}

type ShuffleBag struct {
	gorm.Model
	MemberID uint
}

type WaitQueue struct {
	gorm.Model
	MemberID uint
	Position uint `gorm:"unique"`
}
