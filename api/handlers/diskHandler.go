package handlers

import (
	"console/pkg/disk"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func DiskInfoHandler(c *fiber.Ctx) error {
	diskInfo, err := disk.GetDiskUsage()
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(diskInfo)
}
