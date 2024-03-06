package database

import (
	"context"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
)

var Ctx = context.Background()

func CreateClient(dbNo int) (*redis.Client, error) {
	addr := os.Getenv("DB_ADDR")
	if addr == "" {
		return nil, fmt.Errorf("DB_ADDR environment variable is not set")
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: "", // Update with the actual password if required
		DB:       dbNo,
	})

	// Ping the Redis server to verify connectivity
	if err := rdb.Ping(Ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to ping Redis server: %v", err)
	}

	return rdb, nil
}


