package systeminfo

import "strings"

func parseFileSystem(input string) []string {
	lines := strings.Split(strings.TrimSpace(input), "\n")

	var result []string
	for _, line := range lines {
		if line != "" {
			result = append(result, line)
		}
	}

	return result
}
