package database

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
	_ "github.com/lib/pq"
)

var Ctx = context.Background()

func CreateRedisClient(dbNo int) (*redis.Client, error) {
	addr := os.Getenv("DB_ADDR")
	if addr == "" {
		return nil, fmt.Errorf("DB_ADDR environment variable is not set")
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: "",
		DB:       dbNo,
	})

	if err := rdb.Ping(Ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to ping Redis server: %v", err)
	}

	return rdb, nil
}

func CreatePostgresClient() (*sql.DB, error) {
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			host,
			port,
			user,
			password,
			dbname,
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
			return nil, fmt.Errorf("failed to connect to PostgreSQL: %v", err)
	}

	err = db.Ping()
	if err != nil {
			return nil, fmt.Errorf("failed to ping PostgreSQL: %v", err)
	}

	return db, nil
}


