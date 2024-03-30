package main

import (
	"log"
	"net"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"google.golang.org/grpc"
)

const server_port = ":9621"

type MembersServer struct {
	pb.MembersServiceServer
}

func main() {

	server_listener, err := net.Listen("tcp", server_port)

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
