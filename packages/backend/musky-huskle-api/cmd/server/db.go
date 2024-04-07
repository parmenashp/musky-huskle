package main

import (
	"errors"
	"os"

	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func ConnectToSQLiteDatabase() (*gorm.DB, error) {

	_, err := os.Stat("musky_huskle.db")

	if errors.Is(err, os.ErrNotExist) {
		WarnLog.Printf("Musky huskle DB not found. Creating new one.")
		file, err := os.Create("musky_huskle.db")

		if err != nil {
			ErrLog.Fatal("Could not create initial sqlite database", err)
			return nil, err
		}
		file.Close()
	}

	gormDial := sqlite.Open("musky_huskle.db")
	db, err := gorm.Open(gormDial, &gorm.Config{})

	if err != nil {
		ErrLog.Fatal("Driver could not open sqlite database file")
		return nil, err
	}
	//TODO: Implement database auto-repair
	err = MigrateDb(db)

	if err != nil {
		ErrLog.Fatalf("Could not Auto Migrate database: %v", err)

		return nil, err
	}

	return db, nil
}

func MigrateDb(db *gorm.DB) error {
	err := db.Migrator().AutoMigrate(
		&models.Member{},
		&models.MemberOfDay{},
		&models.ShuffleBag{},
		&models.WaitQueue{},
	)

	if err != nil {
		return err
	}

	return nil
}
