package networkinfo

import (
	"net"
	"os/exec"
	"strings"
)

type NetworkInfo struct {
	Interfaces   []NetworkInterface `json:"interfaces"`
	Connectivity string             `json:"connectivity"`
}

type NetworkInterface struct {
	Name    string   `json:"name"`
	IPs     []string `json:"ips"`
	MACAddr string   `json:"mac_address"`
}

func GetNetworkInfo() NetworkInfo {
	interfaces, _ := net.Interfaces()

	var networkInterfaces []NetworkInterface

	for _, iface := range interfaces {
		addrs, _ := iface.Addrs()

		var ips []string
		for _, addr := range addrs {
			ips = append(ips, addr.String())
		}

		networkInterface := NetworkInterface{
			Name:    iface.Name,
			IPs:     ips,
			MACAddr: iface.HardwareAddr.String(),
		}

		networkInterfaces = append(networkInterfaces, networkInterface)
	}

	connectivity, _ := exec.Command("ping", "-c", "1", "google.com").Output()

	return NetworkInfo{
		Interfaces:   networkInterfaces,
		Connectivity: parseConnectivity(string(connectivity)),
	}
}

func parseConnectivity(input string) string {
	if strings.Contains(input, "unreachable") {
		return "No Connectivity"
	}

	return "Connected"
}
