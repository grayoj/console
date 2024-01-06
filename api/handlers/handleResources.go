package handlers

import (
	systeminfo "console/pkg/system"

	"github.com/gofiber/fiber/v2"
)

func HandleResourceInfo(c *fiber.Ctx) error {
	resourceInfo := systeminfo.GetResourceInfo()
	return c.JSON(resourceInfo)
}
