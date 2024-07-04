package member

import (
	"context"
	"log"
	"os"
	"strconv"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"github.com/DanielKenichi/musky-huskle-api/internal/models"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

var (
	WarnLog = log.New(os.Stderr, "[WARNING] ", log.LstdFlags|log.Lmsgprefix)
	ErrLog  = log.New(os.Stderr, "[ERROR] ", log.LstdFlags|log.Lmsgprefix)
	Log     = log.New(os.Stdout, "[INFO]", log.LstdFlags|log.Lmsgprefix)
)

type MembersService interface {
	CreateMember(member *models.Member) error
	UpdateMember(member *models.Member) error
	DeleteMember(member *models.Member) error
	GetMembers(membersName []string) ([]models.Member, error)
	PickTimer(ctx context.Context)
	MemberPicker(ctx context.Context)
}

type MembersServer struct {
	pb.UnimplementedMembersServiceServer
	membersService MembersService
	validator      *protovalidate.Validator
}

func New(membersService MembersService) (*MembersServer, error) {
	validator, err := protovalidate.New()

	if err != nil {
		ErrLog.Fatalf("Error on protovalidate %v", err)

		return nil, err
	}

	return &MembersServer{membersService: membersService, validator: validator}, nil
}

func (s *MembersServer) MembersService() MembersService {
	return s.membersService
}

func (s *MembersServer) CreateMember(ctx context.Context, req *pb.Member) (*pb.Empty, error) {

	err := s.validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	member := MapMember(req)

	err = s.membersService.CreateMember(member)

	if err != nil {
		return nil, DbError(err)
	}

	return &pb.Empty{}, nil
}

func (s *MembersServer) UpdateMember(ctx context.Context, req *pb.Member) (*pb.Empty, error) {
	err := s.validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	member := MapMember(req)

	err = s.membersService.UpdateMember(member)

	if err != nil {
		return nil, DbError(err)
	}

	return &pb.Empty{}, nil
}

func (s *MembersServer) DeleteMember(ctx context.Context, req *pb.Member) (*pb.Empty, error) {
	err := s.validator.Validate(req)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}

	member := MapMember(req)

	err = s.membersService.DeleteMember(member)

	if err != nil {
		return nil, DbError(err)
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
		return nil, DbError(err)
	}

	var response = &pb.MembersResponse{
		Members: []*pb.MemberResponse{},
	}
	for _, member := range members {

		memberResponse := MapMemberResponse(member)

		response.Members = append(response.Members, memberResponse)
	}

	return response, nil
}

func MapCategoryValue(value string) *pb.CategoryValue {
	return &pb.CategoryValue{
		Value:  value,
		Status: false,
	}
}

func MapMember(pbMember *pb.Member) *models.Member {
	return &models.Member{
		Name:           pbMember.Name,
		GenreIdentity:  pbMember.GenreIdentity,
		Age:            uint8(pbMember.Age),
		FursonaSpecies: pbMember.FursonaSpecies,
		Color:          pbMember.Color,
		Occupation:     pbMember.Occupation,
		Sexuality:      pbMember.Sexuality,
		Sign:           pbMember.Sign,
		MemberSince:    pbMember.MemberSince,
		AvatarUrl:      pbMember.AvatarUrl,
	}
}

func MapMemberResponse(member models.Member) *pb.MemberResponse {
	return &pb.MemberResponse{
		GenreIdentity:  MapCategoryValue(member.GenreIdentity),
		Age:            MapCategoryValue(strconv.Itoa(int(member.Age))),
		FursonaSpecies: MapCategoryValue(member.FursonaSpecies),
		Color:          MapCategoryValue(member.Color),
		Occupation:     MapCategoryValue(member.Occupation),
		Sexuality:      MapCategoryValue(member.Sexuality),
		Sign:           MapCategoryValue(member.Sign),
		MemberSince:    MapCategoryValue(member.MemberSince),
		AvatarUrl:      member.AvatarUrl,
		Name:           member.Name,
	}
}

func DbError(err error) error {
	switch err {
	case gorm.ErrRecordNotFound:
		return status.Errorf(codes.NotFound, err.Error())
	case gorm.ErrDuplicatedKey:
		return status.Errorf(codes.AlreadyExists, err.Error())
	default:
		return status.Errorf(codes.Internal, err.Error())
	}
}
