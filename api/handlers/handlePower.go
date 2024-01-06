package handlers

import (
	"net/http"
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

func HandlePowerAction(c *fiber.Ctx) error {
	action := string(c.Body())
	var cmd *exec.Cmd

	switch action {
	case "off":
		cmd = exec.Command("shutdown", "-h", "now")
	case "reboot":
		cmd = exec.Command("reboot")
	default:
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid action"})
	}

	err := cmd.Run()
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.SendStatus(http.StatusOK)
}
