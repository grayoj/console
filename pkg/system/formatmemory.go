package systeminfo

import "strings"

func formatMemorySize(memSize string) string {
	sizeInBytes := strings.TrimSpace(memSize)
	sizeInGB := sizeInBytes + " GB"

	return sizeInGB
}
