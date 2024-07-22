package routes

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/Anchit1909/shorten-url/database"
	"github.com/gofiber/fiber/v2"
)

func ResolveURL(c *fiber.Ctx) error {
	url := c.Params("url")

	r, err := database.CreateRedisClient(0)
	if err != nil {
		fmt.Println("Redis connection error:", err)
	} else {
		defer r.Close()
		value, err := r.Get(database.Ctx, url).Result()
		if err == nil {
			rInr, _ := database.CreateRedisClient(1)
			defer rInr.Close()
			_ = rInr.Incr(database.Ctx, "counter")
			return c.Redirect(value, 301)
		}
	}

	db, err := database.CreatePostgresClient()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to connect to database"})
	}
	defer db.Close()

	var longURL string
	err = db.QueryRow("SELECT long_url FROM urls WHERE short_url = $1", url).Scan(&longURL)
	if err == sql.ErrNoRows {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Short URL not found in the database"})
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database query failed"})
	}

	if r != nil {
		err = r.Set(database.Ctx, url, longURL, 24*time.Hour).Err() // Cache for 24 hours
		if err != nil {
			fmt.Println("Failed to set URL in Redis cache:", err)
		}
	}

	rInr, _ := database.CreateRedisClient(1)
	defer rInr.Close()
	_ = rInr.Incr(database.Ctx, "counter")

	return c.Redirect(longURL, 301)
}
