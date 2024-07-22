package routes

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/Anchit1909/shorten-url/database"
	"github.com/Anchit1909/shorten-url/helpers"
	"github.com/asaskevich/govalidator"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type request struct {
	URL         string        `json:"url"`
	CustomShort string        `json:"short"`
	Expiry      time.Duration `json:"expiry"`
}

type response struct {
	URL             string        `json:"url"`
	CustomShort     string        `json:"short"`
	Expiry          time.Duration `json:"expiry"`
	XRateRemaining  int           `json:"rate_limit"`
	XRateLimitReset time.Duration `json:"rate_limit_reset"`
	CurrentDate     string        `json:"current_date"`
}

func ShortenURL(c *fiber.Ctx) error {
	body := new(request)
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// rate limiting
	r2, err := database.CreateRedisClient(1)
	if err != nil {
		fmt.Println("Redis connection error:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to connect to rate limiter"})
	}
	defer r2.Close()

	val, err := r2.Get(database.Ctx, c.IP()).Result()
	if err == redis.Nil {
		_ = r2.Set(database.Ctx, c.IP(), os.Getenv("API_QUOTA"), 30*60*time.Second).Err()
	} else {
		valInt, _ := strconv.Atoi(val)
		if valInt <= 0 {
			limit, _ := r2.TTL(database.Ctx, c.IP()).Result()
			return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
				"error":            "Rate Limit Exceeded",
				"rate_limit_reset": limit / time.Nanosecond / time.Minute,
			})
		}
	}

	if !govalidator.IsURL(body.URL) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid URL"})
	}

	if !helpers.RemoveDomainError(body.URL) {
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "You cannot access the system"})
	}

	body.URL = helpers.EnforceHTTP(body.URL)

	var id string
	if body.CustomShort == "" {
		id = uuid.New().String()[:6]
	} else {
		id = body.CustomShort
	}

	db, err := database.CreatePostgresClient()
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to connect to database"})
	}
	defer db.Close()

	var exists bool
	err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM urls WHERE short_url=$1)", id).Scan(&exists)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database query failed"})
	}
	if exists {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Short URL is already in use, please try another one."})
	}

	if body.Expiry == 0 {
		body.Expiry = 24 * 365
	}

	_, err = db.Exec("INSERT INTO urls (short_url, long_url, expiry) VALUES ($1, $2, $3)", id, body.URL, body.Expiry*3600)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to store URL in database"})
	}

	// Set the URL in Redis cache
	r, err := database.CreateRedisClient(0)
	if err != nil {
		fmt.Println("Redis connection error:", err)
	} else {
		defer r.Close()
		err = r.Set(database.Ctx, id, body.URL, body.Expiry*3600*time.Second).Err()
		if err != nil {
			fmt.Println("Failed to set URL in Redis cache:", err)
		}
	}

	resp := response{
		URL:             body.URL,
		CustomShort:     "",
		Expiry:          body.Expiry,
		XRateRemaining:  10,
		XRateLimitReset: 30,
		CurrentDate:     time.Now().Format("Jan 02"),
	}

	r2.Decr(database.Ctx, c.IP())

	val, _ = r2.Get(database.Ctx, c.IP()).Result()
	resp.XRateRemaining, _ = strconv.Atoi(val)

	ttl, _ := r2.TTL(database.Ctx, c.IP()).Result()
	resp.XRateLimitReset = ttl / time.Nanosecond / time.Minute

	resp.CustomShort = os.Getenv("DOMAIN") + "/" + id
	return c.Status(fiber.StatusOK).JSON(resp)
}
