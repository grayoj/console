import React, { useState, useEffect } from "react";
import axios from "axios";
import { WifiIcon } from "@heroicons/react/20/solid";
import { baseUrl } from "../url";

interface NetworkInterface {
  name: string;
  ips: string[] | null;
  mac_address: string;
}

interface NetworkInfoResponse {
  interfaces: NetworkInterface[];
  connectivity: string;
}

interface SystemInfoResponse {
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
  file_system: string[];
  network_info: NetworkInfoResponse;
  processes: any[] | null;
}

const NetworkInfo: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SystemInfoResponse>(
          `${baseUrl}/system`,
        );
        setSystemInfo(response.data);
      } catch (error) {
        console.error("Error fetching system info:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Network Configurations</h2>

      <div>
        <div className="border rounded-sm bg-[#EEF1F559] bg-opacity-30 p-2 my-4">
          <h2>
            {" "}
            Connection Status:{" "}
            <strong>{systemInfo?.network_info.connectivity}</strong>{" "}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {systemInfo?.network_info &&
          systemInfo.network_info.interfaces.map((networkInterface) => (
            <div
              key={networkInterface.name}
              className="border rounded-sm bg-[#EEF1F559] bg-opacity-30 p-4"
            >
              <h2 className="text-md font-bold mb-2">Network Information</h2>
              <WifiIcon className="h-6 w-6 mb-2 text-black" />
              <p className="text-sm font-bold">{networkInterface.name}</p>
              <p className="text-black text-sm">
                MAC Address: {networkInterface.mac_address}
              </p>
              {networkInterface.ips && (
                <p className="text-gray-500 text-sm">
                  IPs: {networkInterface.ips.join(", ")}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NetworkInfo;
