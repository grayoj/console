package handlers

import (
	"console/pkg/processes"
	systeminfo "console/pkg/system"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type ActivityResponse struct {
	SystemInfo systeminfo.SystemInfo `json:"system_info"`
	Processes  []processes.Process   `json:"processes"`
	TotalPages int                   `json:"total_pages"`
}

func HandleActivity(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(c.Query("pageSize"))
	if err != nil || pageSize < 1 {
		pageSize = 10
	}

	processesList, totalPages := processes.GetRunningProcesses(page, pageSize)

	systemInfo := systeminfo.GetSystemInfo()
	systemInfo.Processes = processesList

	response := ActivityResponse{
		SystemInfo: systemInfo,
		Processes:  processesList,
		TotalPages: totalPages,
	}

	return c.JSON(response)
}
