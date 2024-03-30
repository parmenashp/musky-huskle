package main

import (
	"errors"
	"log"
	"os"

	"github.com/DanielKenichi/musky-huskle-api/internal/types"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func ConnectToSQLiteDatabase() (*gorm.DB, error) {

	_, err := os.Stat("musky_huskle.db")

	createTables := false

	if errors.Is(err, os.ErrNotExist) {
		log.Printf("Musky huskle DB not found. Creating new one.")
		file, err := os.Create("musky_huskle.db")

		if err != nil {
			log.Fatal("Could not create initial sqlite database", err)
			return nil, err
		}
		createTables = true
		file.Close()
	}

	gormDial := sqlite.Open("musky_huskle.db")
	db, err := gorm.Open(gormDial, &gorm.Config{})

	if err != nil {
		log.Fatal("Driver could not open sqlite database file")
		return nil, err
	}

	if createTables {
		CreateTables(db)
	}

	return db, nil
}

func CreateTables(db *gorm.DB) {
	db.Migrator().CreateTable(&types.Member{})
}
