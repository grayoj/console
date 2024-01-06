package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/mem"
)

type SystemUsage struct {
	CPUUsage    float64 `json:"cpu_usage"`
	MemoryUsed  uint64  `json:"memory_used"`
	MemoryTotal uint64  `json:"memory_total"`
	Timestamp   int64   `json:"timestamp"`
}

func HandleSystemUsage(c *fiber.Ctx) error {
	cpuUsage, err := cpu.Percent(time.Second, false)
	if err != nil {
		fmt.Println("Error getting CPU usage:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	virtMem, err := mem.VirtualMemory()
	if err != nil {
		fmt.Println("Error getting virtual memory info:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	systemUsage := SystemUsage{
		CPUUsage:    cpuUsage[0],
		MemoryUsed:  virtMem.Used,
		MemoryTotal: virtMem.Total,
		Timestamp:   time.Now().Unix(),
	}

	return c.JSON(systemUsage)
}
