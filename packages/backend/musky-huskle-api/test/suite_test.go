package test

import (
	"log"
	"os"
	"testing"

	"github.com/DanielKenichi/musky-huskle-api/pkg/config"
	"github.com/DanielKenichi/musky-huskle-api/pkg/models"
	"github.com/stretchr/testify/suite"
	"gorm.io/gorm"
)

/*
For this test suite, it is necessary to have a MySQL database connection
as the tests are done integrated with it
*/
type SuiteTest struct {
	suite.Suite
	db *gorm.DB
}

func TestSuite(t *testing.T) {
	os.Setenv("MYSQL_PORT", "3307")
	os.Setenv("MYSQL_USER", "test")
	os.Setenv("MYSQL_ROOT_PASSWORD", "root")
	os.Setenv("MYSQL_DATABASE", "test")
	os.Setenv("MYSQL_PASSWORD", "test")
	os.Setenv("MYSQL_HOST", "localhost")

	defer os.Unsetenv("MYSQL_PORT")
	defer os.Unsetenv("MYSQL_USER")
	defer os.Unsetenv("MYSQL_ROOT_PASSWORD")
	defer os.Unsetenv("MYSQL_DATABASE")
	defer os.Unsetenv("MYSQL_PASSWORD")
	defer os.Unsetenv("MYSQL_HOST")

	suite.Run(t, new(SuiteTest))
}

func (t *SuiteTest) SetupSuite() {
	db, err := config.ConnectToMySQLDatabase()

	db.Migrator().DropTable(&models.Member{})
	db.Migrator().DropTable(&models.MemberOfDay{})
	db.Migrator().DropTable(&models.ShuffleBag{})
	db.Migrator().DropTable(&models.WaitQueue{})

	if err != nil {
		log.Fatalf("error connecting to test database: %v", err)
	}

	t.db = db
}

func (t *SuiteTest) TearDownSuite() {
	sqlDB, _ := t.db.DB()

	t.db.Migrator().DropTable(&models.Member{})
	t.db.Migrator().DropTable(&models.MemberOfDay{})
	t.db.Migrator().DropTable(&models.ShuffleBag{})
	t.db.Migrator().DropTable(&models.WaitQueue{})

	defer sqlDB.Close()
}

func (t *SuiteTest) SetupTest() {
	config.MigrateDb(t.db)
}

func (t *SuiteTest) TearDownTest() {
	t.db.Migrator().DropTable(&models.Member{})
	t.db.Migrator().DropTable(&models.MemberOfDay{})
	t.db.Migrator().DropTable(&models.ShuffleBag{})
	t.db.Migrator().DropTable(&models.WaitQueue{})
}
