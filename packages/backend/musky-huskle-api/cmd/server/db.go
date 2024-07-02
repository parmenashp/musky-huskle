package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/DanielKenichi/musky-huskle-api/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func ConnectToMySQLDatabase() (*gorm.DB, error) {
	dbPass := os.Getenv("MYSQL_PASSWORD")
	dbUser := os.Getenv("MYSQL_USER")
	dbName := os.Getenv("MYSQL_DATABASE")
	dbPort := os.Getenv("MYSQL_PORT")

	dsn := fmt.Sprintf("%s:%s@tcp(musky-huskle-db:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser,
		dbPass,
		dbPort,
		dbName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		ErrLog.Fatalf("Error connecting to mysql database: %v", err)
	}

	err = MigrateDb(db)

	if err != nil {
		ErrLog.Fatalf("Could not Auto Migrate database: %v", err)

		return nil, err
	}

	return db, nil
}

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

	db, err := gorm.Open(sqlite.Open("musky_huskle.db"), &gorm.Config{})

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
