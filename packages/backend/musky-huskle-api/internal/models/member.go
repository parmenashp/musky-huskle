package models

import "time"

type Member struct {
	ID             uint
	GenreIdentity  string
	Age            uint8
	FursonaSpecies string
	Color          string
	Occupation     string
	Sexuality      string
	Sign           string
	MemberSince    string
	AvatarUrl      string
	Name           string `gorm:"unique"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}