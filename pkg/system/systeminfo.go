package systeminfo

import (
	networkinfo "console/internal/network"
	"console/pkg/kernel"
	"console/pkg/processes"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

type SystemInfo struct {
	GoVersion   string                  `json:"go_version"`
	OS          string                  `json:"os"`
	Arch        string                  `json:"arch"`
	CPUs        int                     `json:"cpus"`
	Hostname    string                  `json:"hostname"`
	CurrentUser string                  `json:"current_user"`
	TotalMemory string                  `json:"total_memory"`
	FreeMemory  string                  `json:"free_memory"`
	Uptime      string                  `json:"uptime"`
	LoadAverage string                  `json:"load_average"`
	Kernel      string                  `json:"kernel"`
	FileSystem  []string                `json:"file_system"`
	NetworkInfo networkinfo.NetworkInfo `json:"network_info"`
	Processes   []processes.Process     `json:"processes"`
}

func GetSystemInfo() SystemInfo {
	hostname, _ := os.Hostname()
	username, _ := os.UserHomeDir()

	uptime, _ := exec.Command("uptime").Output()
	loadAverage, _ := exec.Command("uptime", "-s").Output()

	memInfo, _ := exec.Command("sysctl", "hw.memsize").Output()

	totalMemory := formatMemorySize(string(memInfo))
	freeMemory := getFreeMemory()

	processesList, _ := processes.GetRunningProcesses(1, 10)

	files, _ := exec.Command("ls", "/").Output()

	systemInfo := SystemInfo{
		GoVersion:   runtime.Version(),
		OS:          runtime.GOOS,
		Arch:        runtime.GOARCH,
		CPUs:        runtime.NumCPU(),
		Hostname:    hostname,
		CurrentUser: username,
		TotalMemory: totalMemory,
		FreeMemory:  freeMemory,
		Uptime:      strings.TrimSpace(string(uptime)),
		LoadAverage: strings.TrimSpace(string(loadAverage)),
		Kernel:      kernel.GetKernelVersion(),
		FileSystem:  parseFileSystem(string(files)),
		NetworkInfo: networkinfo.GetNetworkInfo(),
		Processes:   processesList,
	}

	return systemInfo
}
