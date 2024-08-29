package member

import (
	"context"
	"errors"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	pb "github.com/DanielKenichi/musky-huskle-api/api/proto"
	"github.com/DanielKenichi/musky-huskle-api/pkg/models"
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
	GetMemberOfDay() (*models.Member, error)
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

func (s *MembersServer) Ping(ctx context.Context, req *pb.PingRequest) (*pb.PingResponse, error) {
	return &pb.PingResponse{
		Message: "pOwOng",
	}, nil
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

		memberOfDay, err := s.membersService.GetMemberOfDay()

		if err != nil && !errors.Is(gorm.ErrRecordNotFound, err) {
			return nil, DbError(err)
		} else if errors.Is(gorm.ErrRecordNotFound, err) {
			memberOfDay = &models.Member{}
		}

		memberResponse := MapMemberResponse(*memberOfDay, member)

		response.Members = append(response.Members, memberResponse)
	}

	return response, nil
}

func MapStringCategoryValue(correctValue, value string) *pb.CategoryValue {
	var status string

	if strings.Compare(correctValue, value) == 0 {
		status = models.RIGHT
	} else {
		status = models.WRONG
	}

	return &pb.CategoryValue{
		Value:  value,
		Status: status,
	}
}

func MapNumericCategoryValue(correctValue, value int) *pb.CategoryValue {

	var status string

	if correctValue == value {
		status = models.RIGHT
	} else if correctValue < value {
		status = models.WRONG_DOWN
	} else {
		status = models.WRONG_UP
	}

	return &pb.CategoryValue{
		Value:  strconv.Itoa(int(value)),
		Status: status,
	}
}

func MapDateCategoryValue(correctValue, value time.Time) *pb.CategoryValue {

	var status string

	if correctValue.Equal(value) {
		status = models.RIGHT
	} else if correctValue.After(value) {
		status = models.WRONG_UP
	} else {
		status = models.WRONG_UP
	}

	return &pb.CategoryValue{
		Value:  value.Format("2006-01-02"),
		Status: status,
	}
}

func MapMember(pbMember *pb.Member) *models.Member {

	birth, err := time.Parse("2006-01-02", pbMember.BirthDate)

	if err != nil {
		ErrLog.Printf("Error parsing member birth date %v", err)
	}

	return &models.Member{
		Name:           pbMember.Name,
		GenreIdentity:  pbMember.GenreIdentity,
		Age:            uint8(pbMember.Age),
		FursonaSpecies: pbMember.FursonaSpecies,
		Color:          pbMember.Color,
		Occupation:     pbMember.Occupation,
		Sexuality:      pbMember.Sexuality,
		Sign:           pbMember.Sign,
		BirthDate:      birth,
		MemberSince:    int(pbMember.MemberSince),
		AvatarUrl:      pbMember.AvatarUrl,
	}
}

func MapMemberResponse(memberOfDay models.Member, member models.Member) *pb.MemberResponse {
	return &pb.MemberResponse{
		GenreIdentity:  MapStringCategoryValue(memberOfDay.GenreIdentity, member.GenreIdentity),
		Age:            MapNumericCategoryValue(int(memberOfDay.Age), int(member.Age)),
		FursonaSpecies: MapStringCategoryValue(memberOfDay.FursonaSpecies, member.FursonaSpecies),
		Color:          MapStringCategoryValue(memberOfDay.Color, member.Color),
		Occupation:     MapStringCategoryValue(memberOfDay.Occupation, member.Occupation),
		Sexuality:      MapStringCategoryValue(memberOfDay.Sexuality, member.Sexuality),
		Sign:           MapStringCategoryValue(memberOfDay.Sign, member.Sign),
		MemberSince:    MapNumericCategoryValue(memberOfDay.MemberSince, member.MemberSince),
		BirthDate:      MapDateCategoryValue(memberOfDay.BirthDate, member.BirthDate),
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
