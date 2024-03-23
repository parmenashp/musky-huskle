package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
)

const server_port = ":9621"

func main() {

	server_listener, err := net.Listen("tcp", server_port)

	if err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}

	gRPCServer := grpc.NewServer()

	log.Printf("Server being started at %v", server_listener.Addr())

	err = gRPCServer.Serve(server_listener)

	if err != nil {
		log.Fatalf("Failed to start the server %v", err)
	}
}
