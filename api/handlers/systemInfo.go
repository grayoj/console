package handlers

import (
	systeminfo "console/pkg/system"

	"github.com/gofiber/fiber/v2"
)

func HandleSystemInfo(c *fiber.Ctx) error {
	systemInfo := systeminfo.GetSystemInfo()
	return c.JSON(systemInfo)
}
