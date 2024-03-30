package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"google.golang.org/grpc"
)

var (
	server_port = flag.Int("port", 9621, "Server Port")
)

type MembersServer struct {
	pb.MembersServiceServer
}

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

	RegisterServiceServers(gRPCServer)

	log.Printf("Server being started at %v", server_listener.Addr())

	err = gRPCServer.Serve(server_listener)

	if err != nil {
		log.Fatalf("Failed to start the server %v", err)
	}
}

func RegisterServiceServers(gRPCServer *grpc.Server) {
	pb.RegisterMembersServiceServer(gRPCServer, &MembersServer{})
}
