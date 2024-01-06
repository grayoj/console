package main

import (
	"embed"
	"fmt"
	"io/fs"

	"console/api/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

//go:embed client/dist/*
var staticFiles embed.FS

func main() {
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

	app.Static("/", "client/dist")

	app.Get("*", func(c *fiber.Ctx) error {
		return c.SendFile("client/dist/index.html")
	})

	err := fs.WalkDir(staticFiles, "client/dist", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		fmt.Println("Embedded file:", path)
		return nil
	})

	if err != nil {
		fmt.Println("Error walking embedded files:", err)
	}

	port := 9595
	fmt.Printf("Server is running on http://localhost:%d\n", port)
	err = app.Listen(fmt.Sprintf(":%d", port))
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
