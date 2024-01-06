package disk

import (
	"time"

	"github.com/shirou/gopsutil/disk"
)

type DiskInfoResponse struct {
	Timestamp time.Time   `json:"timestamp"`
	Usage     []DiskUsage `json:"usage"`
}

type DiskUsage struct {
	Device     string  `json:"device"`
	MountPoint string  `json:"mount_point"`
	Total      uint64  `json:"total"`
	Free       uint64  `json:"free"`
	Used       uint64  `json:"used"`
	Usage      float64 `json:"usage"`
}

func GetDiskUsage() (DiskInfoResponse, error) {
	partitions, err := disk.Partitions(false)
	if err != nil {
		return DiskInfoResponse{}, err
	}

	var diskUsage []DiskUsage

	for _, partition := range partitions {
		usage, err := disk.Usage(partition.Mountpoint)
		if err != nil {
			return DiskInfoResponse{}, err
		}

		diskUsage = append(diskUsage, DiskUsage{
			Device:     partition.Device,
			MountPoint: partition.Mountpoint,
			Total:      usage.Total,
			Free:       usage.Free,
			Used:       usage.Used,
			Usage:      usage.UsedPercent,
		})
	}

	return DiskInfoResponse{
		Timestamp: time.Now(),
		Usage:     diskUsage,
	}, nil
}
