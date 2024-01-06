package systeminfo

import (
	"fmt"
	"os/exec"
	"strings"
)

func getFreeMemory() string {
	memInfo, _ := exec.Command("vm_stat").Output()
	lines := strings.Split(string(memInfo), "\n")
	freePages := extractMemoryStat(lines[1], "free") + extractMemoryStat(lines[5], "speculative") + extractMemoryStat(lines[6], "inactive")

	return fmt.Sprintf("Free: %d KB, %d MB, %d GB", freePages*4096/1024, freePages*4096/(1024*1024), freePages*4096/(1024*1024*1024))
}

func extractMemoryStat(line, statName string) int {
	fields := strings.Fields(line)
	for i, field := range fields {
		if field == statName {
			return parseInt(fields[i+1])
		}
	}
	return 0
}

func parseInt(s string) int {
	var val int
	fmt.Sscanf(s, "%d", &val)
	return val
}
