package muskyhuskle

import "time"

type Time interface {
	Now() time.Time
	Date(year int, month time.Month, day int, hour int, min int, sec int, nsec int, loc *time.Location) time.Time
	NewTimer(d time.Duration) *time.Timer
}
