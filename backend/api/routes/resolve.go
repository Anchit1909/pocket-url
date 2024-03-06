package routes

import (
	"fmt"

	"github.com/Anchit1909/shorten-url/database"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

func ResolveURL(c *fiber.Ctx) error {
	url := c.Params("url")
	r, err := database.CreateClient(0);
	if err!=nil {
		fmt.Println("error");
	 }
	defer r.Close()

	value, err := r.Get(database.Ctx, url).Result()
	if err == redis.Nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error":"short url not found in the database"})
	} else if err!=nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error":"cannot connect to DB"})
	}
	rInr, err := database.CreateClient(1)
	if err!=nil {
		fmt.Println("error");
	 }
	defer rInr.Close()

	_ = rInr.Incr(database.Ctx, "counter")

	return c.Redirect(value, 301)
}
