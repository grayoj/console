package processes

import (
	"fmt"
	"math"
	"os/exec"
	"strings"
)

type Process struct {
	PID  string `json:"pid"`
	Name string `json:"name"`
}

func GetRunningProcesses(page, pageSize int) ([]Process, int) {
	cmd := exec.Command("ps", "aux")
	output, err := cmd.Output()
	if err != nil {
		fmt.Printf("Error retrieving processes: %s\n", err)
		return nil, 0
	}

	lines := strings.Split(string(output), "\n")
	var processes []Process

	for _, line := range lines[1:] {
		fields := strings.Fields(line)
		if len(fields) >= 11 {
			pid := fields[1]
			name := fields[10]
			process := Process{PID: pid, Name: name}
			processes = append(processes, process)
		}
	}

	startIndex := (page - 1) * pageSize
	endIndex := startIndex + pageSize

	if endIndex > len(processes) {
		endIndex = len(processes)
	}

	paginatedProcesses := processes[startIndex:endIndex]

	totalPages := int(math.Ceil(float64(len(processes)) / float64(pageSize)))

	return paginatedProcesses, totalPages
}
