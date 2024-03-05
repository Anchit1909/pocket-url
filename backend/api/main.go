package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Anchit1909/shorten-url/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/v1", routes.ShortenURL)
}

func main() {
	err:=godotenv.Load()
	if err!=nil {
		fmt.Println(err)
	}

	app:=fiber.New()
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowMethods: "GET,POST",
    AllowHeaders: "Content-Type,Authorization",
}))
	setupRoutes(app)

	log.Fatal(app.Listen(os.Getenv("APP_PORT")))
}
