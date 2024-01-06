package systeminfo

import (
	"os/exec"
	"strings"
)

type ResourceInfo struct {
	Battery   string `json:"battery"`
	DiskUsage string `json:"disk_usage"`
	Memory    string `json:"memory"`
}

func GetResourceInfo() ResourceInfo {
	var battery, diskUsage, memory string

	batteryOutput, err := exec.Command("cat", "/sys/class/power_supply/BAT0/capacity").Output()
	if err == nil {
		battery = string(batteryOutput)
	}

	dfOutput, err := exec.Command("df", "-h").Output()
	if err == nil {
		diskUsage = string(dfOutput)
	}

	memoryOutput, err := exec.Command("free", "-h").Output()
	if err == nil {
		memory = string(memoryOutput)
	}

	return ResourceInfo{
		Battery:   strings.TrimSpace(battery),
		DiskUsage: strings.TrimSpace(diskUsage),
		Memory:    strings.TrimSpace(memory),
	}
}
