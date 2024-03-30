package members

import (
	"context"
	"log"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	members "github.com/DanielKenichi/musky-huskle-api/internal/services"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type MembersServer struct {
	pb.UnimplementedMembersServiceServer
	membersService members.MembersService
}

func New(membersService members.MembersService) *MembersServer {
	return &MembersServer{membersService: membersService}
}

func (s *MembersServer) CreateMember(ctx context.Context, req *pb.Member) (*pb.Empty, error) {

	validator, err := protovalidate.New()

	if err != nil {
		log.Fatalf("Error on protovalidate %v", err)

		return nil, status.Errorf(codes.Internal, err.Error())
	}

	err = validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	member := &models.Member{
		Name:          req.Name,
		GenreIdentity: req.GenreIdentity,
		Age:           uint8(req.Age),
	}

	err = s.membersService.CreateMember(ctx, member)

	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &pb.Empty{}, nil
}
