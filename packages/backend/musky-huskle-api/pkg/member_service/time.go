package member

import "time"

type Time struct{}

func (t *Time) Now() time.Time {
	return time.Now()
}

func (t *Time) Date(year int, month time.Month, day int, hour int, min int, sec int, nsec int, loc *time.Location) time.Time {
	return time.Date(year, month, day, hour, min, sec, nsec, loc)
}

func (t *Time) NewTimer(d time.Duration) *time.Timer {
	return time.NewTimer(d)
}
