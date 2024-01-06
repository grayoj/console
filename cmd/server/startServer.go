package server

import (
	"console/api/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func StartServer() *fiber.App {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(recover.New())

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type")
		return c.Next()
	})

	r := app.Group("/api/v1")

	r.Get("/system", handlers.HandleSystemInfo)
	r.Post("/poweroff", handlers.HandlePowerAction)
	r.Get("/activity", handlers.HandleActivity)
	r.Get("/systemusage", handlers.HandleSystemUsage)
	r.Get("/diskinfo", handlers.DiskInfoHandler)

	return app
}
