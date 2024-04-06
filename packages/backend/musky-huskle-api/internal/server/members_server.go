package members

import (
	"context"
	"log"
	"strconv"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type MembersService interface {
	CreateMember(member *models.Member) error
	GetMembers(membersName []string) ([]models.Member, error)
}

type MembersServer struct {
	pb.UnimplementedMembersServiceServer
	membersService MembersService
	validator      *protovalidate.Validator
}

func New(membersService MembersService) (*MembersServer, error) {
	validator, err := protovalidate.New()

	if err != nil {
		log.Fatalf("Error on protovalidate %v", err)

		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &MembersServer{membersService: membersService, validator: validator}, nil
}

func (s *MembersServer) CreateMember(ctx context.Context, req *pb.Member) (*pb.Empty, error) {

	err := s.validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	member := &models.Member{
		Name:           req.Name,
		GenreIdentity:  req.GenreIdentity,
		Age:            uint8(req.Age),
		FursonaSpecies: req.FursonaSpecies,
		Color:          req.Color,
		Occupation:     req.Occupation,
		Sexuality:      req.Sexuality,
		Sign:           req.Sign,
		MemberSince:    req.MemberSince,
		AvatarUrl:      req.AvatarUrl,
	}

	err = s.membersService.CreateMember(member)

	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	return &pb.Empty{}, nil
}

func (s *MembersServer) GetMembers(ctx context.Context, req *pb.GetMembersRequest) (*pb.MembersResponse, error) {
	err := s.validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	members, err := s.membersService.GetMembers(req.MembersName)

	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	var response = &pb.MembersResponse{
		Members: []*pb.MemberResponse{},
	}
	for _, member := range members {

		memberResponse := &pb.MemberResponse{
			GenreIdentity:  GetCategoryValue(member.GenreIdentity),
			Age:            GetCategoryValue(strconv.Itoa(int(member.Age))),
			FursonaSpecies: GetCategoryValue(member.FursonaSpecies),
			Color:          GetCategoryValue(member.Color),
			Occupation:     GetCategoryValue(member.Occupation),
			Sexuality:      GetCategoryValue(member.Sexuality),
			Sign:           GetCategoryValue(member.Sign),
			MemberSince:    GetCategoryValue(member.MemberSince),
			AvatarUrl:      member.AvatarUrl,
			Name:           member.Name,
		}

		response.Members = append(response.Members, memberResponse)
	}

	return response, nil
}

func GetCategoryValue(value string) *pb.CategoryValue {
	return &pb.CategoryValue{
		Value:  value,
		Status: false,
	}
}
