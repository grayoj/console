import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BeakerIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  RssIcon,
  ServerIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { baseUrl } from "../url";

interface SystemInfo {
  go_version: string;
  os: string;
  arch: string;
  cpus: number;
  hostname: string;
  current_user: string;
  total_memory: string;
  free_memory: string;
  uptime: string;
  load_average: string;
  kernel: string;
}

const SystemInfoGrid: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<SystemInfo>(`${baseUrl}/system`);
      setSystemInfo(response.data);
    } catch (error) {
      console.error("Error fetching system info:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {systemInfo && (
        <>
          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <ComputerDesktopIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Console Version</h2>
            <p>1.0.0</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <ServerIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">OS</h2>
            <p>{systemInfo.os}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <CpuChipIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Architecture</h2>
            <p>{systemInfo.arch}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <CpuChipIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">CPUs</h2>
            <p>{systemInfo.cpus}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <RssIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Hostname</h2>
            <p>{systemInfo.hostname}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <UserIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Current User</h2>
            <p>{systemInfo.current_user}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <ServerIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Total Memory</h2>
            <p>{systemInfo.total_memory}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <ServerIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Free Memory</h2>
            <p>{systemInfo.free_memory}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <CircleStackIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Uptime</h2>
            <p>{systemInfo.uptime}</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <CubeTransparentIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lf font-semibold mb-2">Load Average</h2>
            <p>N/A</p>
          </div>

          <div className="p-4 border rounded-sm bg-[#EEF1F559] bg-opacity-30 ">
            <BeakerIcon className="h-6 w-6 text-black mb-2" />
            <h2 className="text-lg font-semibold mb-2">Kernel</h2>
            <p>{systemInfo.kernel}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SystemInfoGrid;
