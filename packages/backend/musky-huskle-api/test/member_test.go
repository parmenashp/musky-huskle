package test

import (
	"context"
	"errors"
	"log"
	"time"

	mock_time "github.com/DanielKenichi/musky-huskle-api/mocks/github.com/DanielKenichi/musky-huskle-api/pkg"
	members_service "github.com/DanielKenichi/musky-huskle-api/pkg/member_service"
	"github.com/DanielKenichi/musky-huskle-api/pkg/models"
	"gorm.io/gorm"
)

func (t *SuiteTest) TestPickTimer() {

	mockTime := mock_time.NewMockTime(t.T())

	testCases := []struct {
		description string
		service     *members_service.MembersService
	}{
		{
			description: "Testing timer reset after midnight",
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
	}

	//1 second before midnight
	mockTime.On("Now").Return(
		time.Date(2024, time.June, 21, 23, 59, 59, 0, time.Now().Location()),
	)

	mockTime.On("Date", 2024, time.June, 21, 0, 0, 0, 0, time.Now().Location()).
		Return(
			time.Date(2024, time.June, 21, 0, 0, 0, 0, time.Now().Location()),
		)

	mockTime.On("NewTimer", time.Second*1).Return(
		func(d time.Duration) *time.Timer { return time.NewTimer(d) },
	)

	for _, tt := range testCases {

		ctx, cancel := context.WithCancel(context.Background())

		go func() {
			tt.service.PickTimer(ctx)
		}()

		pickEvent := <-tt.service.InternalChan

		t.NotNil(pickEvent)

		cancel()
	}

}

func (t *SuiteTest) TestIsMemberOfDaySet() {

	mockTime := mock_time.NewMockTime(t.T())

	testCases := []struct {
		description string
		expected    bool
		service     *members_service.MembersService
	}{
		{
			description: "Testing Verify member of day set",
			expected:    true,
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
		{
			description: "Testing verify member of day not set",
			expected:    false,
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
	}

	mockTime.On("Now").Once().Return(
		time.Date(2024, time.June, 22, 6, 2, 1, 0, time.Now().Location()),
	)
	mockTime.On("Now").Once().Return(
		time.Date(2024, time.June, 23, 6, 2, 1, 0, time.Now().Location()),
	)

	result := t.db.Save(&models.Member{
		Name: "test-member",
	})

	if result.Error != nil {
		log.Fatalf("Failed setting up test data: %v", result.Error)
	}

	var member *models.Member

	result = t.db.Where("name = ?", "test-member").First(&member)

	if result.Error != nil {
		log.Fatalf("Failed setting up test data: %v", result.Error)
	}

	t.db.Save(&models.MemberOfDay{
		MemberID:   member.ID,
		MemberName: member.Name,
		Date:       time.Date(2024, time.June, 22, 0, 0, 0, 0, time.Now().Location()),
	})

	for _, tt := range testCases {
		got := tt.service.IsMemberOfDaySet(t.db)

		t.Equal(tt.expected, got)
	}

}

func (t *SuiteTest) TestSetMemberOfDay() {

	mockTime := mock_time.NewMockTime(t.T())

	testCases := []struct {
		description           string
		member                *models.Member
		expectedQueuePosition uint
		service               *members_service.MembersService
	}{
		{
			description: "Testing set member of day with no entry Queue",
			member: &models.Member{
				Name: "firstMember",
			},
			expectedQueuePosition: 1,
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
		{
			description: "Testing set member of day with entry on wait queue",
			member: &models.Member{
				Name: "secondMember",
			},
			expectedQueuePosition: 2,
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
		{
			description: "Testing set member that was a member of day in the past",
			member: &models.Member{
				Name: "oldMember",
			},
			expectedQueuePosition: 3,
			service: &members_service.MembersService{
				Db:           t.db,
				InternalChan: make(chan members_service.PickEvent),
				Time:         mockTime,
			},
		},
	}

	mockTime.On("Now").Once().Return(
		time.Date(2023, time.June, 23, 6, 2, 1, 0, time.Now().Location()),
	)

	mockTime.On("Now").Once().Return(
		time.Date(2023, time.June, 24, 6, 2, 1, 0, time.Now().Location()),
	)

	mockTime.On("Now").Once().Return(
		time.Date(2023, time.June, 25, 6, 2, 1, 0, time.Now().Location()),
	)

	mockTime.On("Date", 2023, time.June, 23, 0, 0, 0, 0, time.Now().Location()).
		Return(
			time.Date(2023, time.June, 23, 0, 0, 0, 0, time.Now().Location()),
		)

	mockTime.On("Date", 2023, time.June, 24, 0, 0, 0, 0, time.Now().Location()).
		Return(
			time.Date(2023, time.June, 24, 0, 0, 0, 0, time.Now().Location()),
		)

	mockTime.On("Date", 2023, time.June, 25, 0, 0, 0, 0, time.Now().Location()).
		Return(
			time.Date(2023, time.June, 25, 0, 0, 0, 0, time.Now().Location()),
		)

	var oldMODEntry *models.MemberOfDay

	for _, tt := range testCases {
		t.db.Save(tt.member)

		if tt.member.Name == "oldMember" {
			oldMODEntry = &models.MemberOfDay{
				MemberName: tt.member.Name,
				MemberID:   tt.member.ID,
				Date:       time.Date(2020, time.April, 15, 0, 0, 0, 0, time.Now().Location()),
			}
			t.db.Save(oldMODEntry)
		}
	}

	for _, tt := range testCases {
		err := tt.service.SetMemberOfDay(t.db, tt.member)

		t.Nil(err)

		var memberOfDay *models.MemberOfDay
		var queueEntry *models.WaitQueue

		result := t.db.Where("member_name = ?", tt.member.Name).Last(&memberOfDay)

		t.Nil(result.Error)
		t.NotNil(memberOfDay)
		t.Equal(tt.member.ID, memberOfDay.MemberID)
		t.NotEqual(oldMODEntry, memberOfDay)

		result = t.db.Where("member_id = ?", memberOfDay.MemberID).First(&queueEntry)

		t.Nil(result.Error)
		t.Equal(tt.expectedQueuePosition, queueEntry.Position)
	}
}

func (t *SuiteTest) TestPickMemberOfDayNoRefill() {
	members := []*models.Member{
		{
			Name: "member1",
		},
		{
			Name: "member2",
		},
		{
			Name: "member3",
		},
		{
			Name: "member4",
		},
	}

	t.db.Save(members)

	var shuffleBag []models.ShuffleBag = make([]models.ShuffleBag, 0)

	for _, member := range members {

		shuffleBagEntry := &models.ShuffleBag{
			MemberID: member.ID,
		}

		t.db.Save(&shuffleBagEntry)

		shuffleBag = append(shuffleBag, *shuffleBagEntry)
	}

	member, err := members_service.PickMemberOfDay(t.db, shuffleBag)

	t.Nil(err)

	t.Equal(member, members[0])

	var removedShuffleBagEntry models.ShuffleBag

	result := t.db.Where("member_id = ?", member.ID).First(&removedShuffleBagEntry)
	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))
}

func (t *SuiteTest) TestPickMemberOfDayWithEvenShuffleBagRefill() {
	members := []*models.Member{
		{
			Name: "member1",
		},
		{
			Name: "member2",
		},
		{
			Name: "member3",
		},
		{
			Name: "member4",
		},
	}

	t.db.Save(members)

	var shuffleBag []models.ShuffleBag = make([]models.ShuffleBag, 0)

	var i = 0

	for i < (len(members) / 2) {

		shuffleBagEntry := &models.ShuffleBag{
			MemberID: members[i].ID,
		}

		t.db.Save(&shuffleBagEntry)

		shuffleBag = append(shuffleBag, *shuffleBagEntry)

		i++
	}

	i = len(members)

	var position = 1

	var waitQueue []models.WaitQueue = make([]models.WaitQueue, 0)

	for i > (len(members) / 2) {

		waitQueueEntry := &models.WaitQueue{
			MemberID: members[i-1].ID,
			Position: uint(position),
		}

		position++
		i--

		t.db.Save(&waitQueueEntry)

		waitQueue = append(waitQueue, *waitQueueEntry)
	}

	member, err := members_service.PickMemberOfDay(t.db, shuffleBag)

	t.Nil(err)

	t.Equal(member, members[0])

	var removedShuffleBagEntry models.ShuffleBag
	var newShuffleBagEntry models.ShuffleBag
	var removedQueueEntry models.WaitQueue
	var newQueueEntry models.WaitQueue

	result := t.db.Where("member_id = ?", member.ID).First(&removedShuffleBagEntry)
	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	result = t.db.Where("member_id = ?", waitQueue[0].MemberID).First(&newShuffleBagEntry)
	t.Nil(result.Error)
	t.NotNil(newShuffleBagEntry)

	result = t.db.Where("member_id = ?", waitQueue[0].MemberID).First(&removedQueueEntry)
	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	result = t.db.Where("member_id = ?", waitQueue[1].MemberID).First(&newQueueEntry)
	t.Nil(result.Error)
	t.Equal(uint(1), newQueueEntry.Position)
}

func (t *SuiteTest) TestPickMemberOfDayWithOddShuffleBagRefill() {
	members := []*models.Member{
		{
			Name: "member1",
		},
		{
			Name: "member2",
		},
		{
			Name: "member3",
		},
		{
			Name: "member4",
		},
		{
			Name: "member5",
		},
	}

	t.db.Save(members)

	var shuffleBag []models.ShuffleBag = make([]models.ShuffleBag, 0)

	var i = 0

	for i < (len(members) / 2) {

		shuffleBagEntry := &models.ShuffleBag{
			MemberID: members[i].ID,
		}

		t.db.Save(&shuffleBagEntry)

		shuffleBag = append(shuffleBag, *shuffleBagEntry)

		i++
	}

	i = len(members)

	var position = 1

	var waitQueue []models.WaitQueue = make([]models.WaitQueue, 0)

	for i > (len(members) / 2) {

		waitQueueEntry := &models.WaitQueue{
			MemberID: members[i-1].ID,
			Position: uint(position),
		}

		position++
		i--

		t.db.Save(&waitQueueEntry)

		waitQueue = append(waitQueue, *waitQueueEntry)
	}

	member, err := members_service.PickMemberOfDay(t.db, shuffleBag)

	t.Nil(err)

	t.Equal(member, members[0])

	var removedShuffleBagEntry models.ShuffleBag
	var newShuffleBagEntry models.ShuffleBag
	var removedQueueEntry models.WaitQueue
	var newQueueEntry models.WaitQueue

	result := t.db.Where("member_id = ?", member.ID).First(&removedShuffleBagEntry)
	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	result = t.db.Where("member_id = ?", waitQueue[0].MemberID).First(&newShuffleBagEntry)
	t.Nil(result.Error)
	t.NotNil(newShuffleBagEntry)

	result = t.db.Where("member_id = ?", waitQueue[0].MemberID).First(&removedQueueEntry)
	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	result = t.db.Where("member_id = ?", waitQueue[1].MemberID).First(&newQueueEntry)
	t.Nil(result.Error)
	t.Equal(uint(1), newQueueEntry.Position)
}

func (t *SuiteTest) TestGetShuffleBag() {
	testCases := []struct {
		description        string
		members            []models.Member
		expectedShuffleBag []models.ShuffleBag
		expectedError      error
	}{
		{
			description:   "Testing get invalid shuffle bag",
			expectedError: errors.New("not enough members on shuffle bag"),
			members: []models.Member{
				{
					Name: "member1",
				},
				{
					Name: "member2",
				},
			},
			expectedShuffleBag: []models.ShuffleBag{},
		},
		{
			description:   "Testing get valid shuffle bag",
			expectedError: nil,
			members: []models.Member{
				{
					Name: "member3",
				},
				{
					Name: "member4",
				},
				{
					Name: "member5",
				},
				{
					Name: "member6",
				},
			},
			expectedShuffleBag: []models.ShuffleBag{},
		},
	}

	for _, tt := range testCases {

		for _, member := range tt.members {
			t.db.Save(&member)

			shuffleBagEntry := models.ShuffleBag{
				MemberID: member.ID,
			}

			tt.expectedShuffleBag = append(tt.expectedShuffleBag, shuffleBagEntry)
		}

		t.db.Save(tt.expectedShuffleBag)

		got, err := members_service.GetShuffledBag(t.db)

		if tt.expectedError != nil {
			t.NotNil(err)
			t.Nil(got)
			t.Equal(tt.expectedError.Error(), err.Error())
			continue
		}

		t.Nil(err)

		//not equal because the bag must be shuffled
		t.NotEqual(tt.expectedShuffleBag, got)

		t.db.Delete(tt.expectedShuffleBag)
	}
}

func (t *SuiteTest) TestCreateMember() {

	mockTime := mock_time.NewMockTime(t.T())

	service := &members_service.MembersService{
		Db:           t.db,
		InternalChan: make(chan members_service.PickEvent),
		Time:         mockTime,
	}

	member := &models.Member{
		Name: "TestCreateMember",
	}

	err := service.CreateMember(member)

	t.Nil(err)

	var createdMember models.Member

	result := t.db.Where("name = ?", member.Name).First(&createdMember)

	t.Nil(result.Error)

	var createdShuffleBagEntry models.ShuffleBag

	result = t.db.Where("member_id = ?", createdMember.ID).First(&createdShuffleBagEntry)

	t.Nil(result.Error)
	t.NotNil(createdShuffleBagEntry)
}

func (t *SuiteTest) TestGetMember() {

	mockTime := mock_time.NewMockTime(t.T())

	service := &members_service.MembersService{
		Db:           t.db,
		InternalChan: make(chan members_service.PickEvent),
		Time:         mockTime,
	}

	members := []models.Member{
		{
			Name: "member1",
		},
		{
			Name: "member2",
		},
		{
			Name: "member3",
		},
	}

	for _, member := range members {
		service.CreateMember(&member)
	}

	memberNames := []string{"member1", "member2"}

	gotMembers, err := service.GetMembers(memberNames)

	t.Nil(err)

	for _, gotMember := range gotMembers {
		t.Contains(memberNames, gotMember.Name)
	}

}

func (t *SuiteTest) TestUpdateMember() {

	mockTime := mock_time.NewMockTime(t.T())

	service := &members_service.MembersService{
		Db:           t.db,
		InternalChan: make(chan members_service.PickEvent),
		Time:         mockTime,
	}

	member := &models.Member{
		Name:           "TestUpdateMember",
		Age:            uint8(18),
		GenreIdentity:  "cis male",
		FursonaSpecies: "cat",
		Color:          "white",
		Occupation:     "IT",
		Sexuality:      "bissexual",
		Sign:           "Aries",
		MemberSince:    "2020",
		AvatarUrl:      "http://uwu.com",
	}

	service.CreateMember(member)

	updatedMember := &models.Member{
		Name:           "TestUpdateMember",
		Age:            uint8(20),
		GenreIdentity:  "trans male",
		FursonaSpecies: "cheetah",
		Color:          "yellow",
		Occupation:     "Art",
		Sexuality:      "pansexual",
		Sign:           "Scorpion",
		MemberSince:    "2024",
		AvatarUrl:      "http://owo.com",
	}

	err := service.UpdateMember(updatedMember)

	t.Nil(err)

	var updated models.Member

	result := t.db.Where("name = ?", member.Name).First(&updated)

	t.Nil(result.Error)

	t.NotEqual(member.Age, updated.Age)
	t.Equal(updatedMember.Age, updated.Age)

	t.NotEqual(member.GenreIdentity, updated.GenreIdentity)
	t.Equal(updatedMember.GenreIdentity, updated.GenreIdentity)

	t.NotEqual(member.FursonaSpecies, updated.FursonaSpecies)
	t.Equal(updatedMember.FursonaSpecies, updated.FursonaSpecies)

	t.NotEqual(member.Color, updated.Color)
	t.Equal(updatedMember.Color, updated.Color)

	t.NotEqual(member.Occupation, updated.Occupation)
	t.Equal(updatedMember.Occupation, updated.Occupation)

	t.NotEqual(member.Sexuality, updated.Sexuality)
	t.Equal(updatedMember.Sexuality, updated.Sexuality)

	t.NotEqual(member.Sign, updated.Sign)
	t.Equal(updatedMember.Sign, updated.Sign)

	t.NotEqual(member.MemberSince, updated.MemberSince)
	t.Equal(updatedMember.MemberSince, updated.MemberSince)

	t.NotEqual(member.AvatarUrl, updated.AvatarUrl)
	t.Equal(updatedMember.AvatarUrl, updated.AvatarUrl)
}

func (t *SuiteTest) TestDeleteMember() {
	mockTime := mock_time.NewMockTime(t.T())

	service := &members_service.MembersService{
		Db:           t.db,
		InternalChan: make(chan members_service.PickEvent),
		Time:         mockTime,
	}

	testCases := []struct {
		description string
		expected    bool
		member      *models.Member
	}{
		{
			description: "Testing delete member with shuffle bag entry",
			expected:    true,
			member: &models.Member{
				Name: "member1",
			},
		},
		{
			description: "Testing delete member with waitQueue entry",
			expected:    false,
			member: &models.Member{
				Name: "member2",
			},
		},
		{
			description: "Testing delete member with memberofday entry",
			expected:    false,
			member: &models.Member{
				Name: "member3",
			},
		},
	}

	members := make([]models.Member, 0)

	for _, tt := range testCases {
		t.db.Save(tt.member)

		members = append(members, *tt.member)
	}

	shuffleBagEntry := &models.ShuffleBag{
		MemberID: members[0].ID,
	}

	t.db.Save(shuffleBagEntry)

	waitQueueEntry := &models.WaitQueue{
		MemberID: members[1].ID,
		Position: 1,
	}

	t.db.Save(waitQueueEntry)

	memberOfDayEntries := []models.MemberOfDay{
		{
			MemberID:   members[2].ID,
			MemberName: members[2].Name,
			Date:       time.Date(2023, time.June, 21, 0, 0, 0, 0, time.Now().Location()),
		},
		{
			MemberID:   members[2].ID,
			MemberName: members[2].Name,
			Date:       time.Date(2023, time.June, 22, 0, 0, 0, 0, time.Now().Location()),
		},
	}

	t.db.Save(memberOfDayEntries)

	for _, tt := range testCases {
		err := service.DeleteMember(tt.member)

		t.Nil(err)

		var deletedMember models.Member

		result := t.db.Where("name = ?", tt.member.Name).First(&deletedMember)

		t.NotNil(result.Error)
		t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))
	}

	var deletedShuffleBag models.ShuffleBag

	result := t.db.Where("id = ?", shuffleBagEntry.ID).First(&deletedShuffleBag)

	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	var deletedQueueEntry models.WaitQueue

	result = t.db.Where("id = ?", waitQueueEntry.ID).First(&deletedQueueEntry)

	t.NotNil(result.Error)
	t.True(errors.Is(result.Error, gorm.ErrRecordNotFound))

	for _, memberOfDayEntry := range memberOfDayEntries {

		var nilMemberEntry models.MemberOfDay
		result = t.db.Where("id = ?", memberOfDayEntry.ID).First(&nilMemberEntry)

		t.Nil(result.Error)
		t.NotNil(nilMemberEntry)
		t.Equal(uint(0), nilMemberEntry.MemberID)
	}
}
