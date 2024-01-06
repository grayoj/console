package kernel

import (
	"os/exec"
	"runtime"
	"strings"
)

func GetKernelVersion() string {
	if runtime.GOOS == "darwin" {
		return getMacOSKernelVersion()
	} else if runtime.GOOS == "linux" {
		return getLinuxKernelVersion()
	}

	return "Operating System is unknown"
}

func getMacOSKernelVersion() string {
	uname, _ := exec.Command("sysctl", "-n", "kern.osrelease").Output()
	return strings.TrimSpace(string(uname))
}

func getLinuxKernelVersion() string {
	uname, _ := exec.Command("uname", "-r").Output()
	return strings.TrimSpace(string(uname))
}
