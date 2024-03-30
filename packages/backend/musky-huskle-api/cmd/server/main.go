package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	members_server "github.com/DanielKenichi/musky-huskle-api/internal/server"
	members_service "github.com/DanielKenichi/musky-huskle-api/internal/services"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/gorm"
)

var (
	server_port = flag.Int("port", 9621, "Server Port")
)

func init() {
	flag.Parse()
}

func main() {

	gormDb, err := ConnectToSQLiteDatabase()

	db, _ := gormDb.DB()

	defer db.Close()

	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	server_listener, err := net.Listen("tcp", fmt.Sprintf(":%d", *server_port))

	if err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}

	gRPCServer := grpc.NewServer()

	RegisterServiceServers(gRPCServer, gormDb)

	log.Printf("Server being started at %v", server_listener.Addr())

	reflection.Register(gRPCServer)

	err = gRPCServer.Serve(server_listener)

	if err != nil {
		log.Fatalf("Failed to start the server %v", err)
	}
}

func RegisterServiceServers(gRPCServer *grpc.Server, gormDb *gorm.DB) {
	membersService := members_service.New(gormDb)
	membersServer := members_server.New(*membersService)

	pb.RegisterMembersServiceServer(gRPCServer, membersServer)
}
