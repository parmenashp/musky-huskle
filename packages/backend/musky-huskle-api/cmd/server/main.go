package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"github.com/DanielKenichi/musky-huskle-api/pkg/config"
	members_server "github.com/DanielKenichi/musky-huskle-api/pkg/member_server"
	members_service "github.com/DanielKenichi/musky-huskle-api/pkg/member_service"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/gorm"
)

// TODO: use logger instead of these log vars
var (
	WarnLog = log.New(os.Stderr, "[WARNING] ", log.LstdFlags|log.Lmsgprefix)
	ErrLog  = log.New(os.Stderr, "[ERROR] ", log.LstdFlags|log.Lmsgprefix)
	Log     = log.New(os.Stdout, "[INFO]", log.LstdFlags|log.Lmsgprefix)
)

var (
	server_port = flag.Int("port", 9621, "Server Port")
	db_type     = flag.String("database_type", "MySQL", "Type of database to use")
)

func init() {
	err := godotenv.Load(".env")

	if err != nil {
		WarnLog.Printf("Failed to load env file %v", err)
	}

	flag.Parse()
}

func main() {
	gormDb, err := ConnectToDatabase()

	db, _ := gormDb.DB()

	defer db.Close()

	if err != nil {
		ErrLog.Fatalf("Could not connect to database: %v", err)
	}

	server_listener, err := net.Listen("tcp", fmt.Sprintf(":%d", *server_port))

	if err != nil {
		ErrLog.Fatalf("Failed to start the server: %v", err)
	}

	gRPCServer := grpc.NewServer()

	membersServer, err := RegisterMemberServer(gRPCServer, gormDb)

	if err != nil {
		ErrLog.Fatalf("Failed to register servers: %v", err)
	}

	Log.Printf("Server being started at %v", server_listener.Addr())

	reflection.Register(gRPCServer)

	ctx, cancel := context.WithCancel(context.Background())

	defer cancel()

	go membersServer.MembersService().PickTimer(ctx)
	go membersServer.MembersService().MemberPicker(ctx)

	err = gRPCServer.Serve(server_listener)

	if err != nil {
		ErrLog.Fatalf("Failed to start the server %v", err)
	}
}

func ConnectToDatabase() (*gorm.DB, error) {
	var gormDb *gorm.DB
	var err error

	if *db_type == "MySQL" {
		gormDb, err = config.ConnectToMySQLDatabase()
	} else if *db_type == "SQLite" {
		gormDb, err = config.ConnectToSQLiteDatabase()
	} else {
		ErrLog.Fatal("Unsuported database type")
	}

	if err != nil {
		return nil, err
	}

	return gormDb, nil
}

func RegisterMemberServer(gRPCServer *grpc.Server, gormDb *gorm.DB) (*members_server.MembersServer, error) {
	membersService := members_service.New(gormDb)
	membersServer, err := members_server.New(membersService)

	if err != nil {
		ErrLog.Fatal("Failed to register MemberService Server")
		return nil, err
	}

	pb.RegisterMembersServiceServer(gRPCServer, membersServer)

	return membersServer, nil
}
