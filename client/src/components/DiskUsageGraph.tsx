import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { baseUrl } from "../url";

interface DiskUsageData {
  timestamp: string;
  diskUsage: number;
}

const DiskUsageGraph: React.FC = () => {
  const [data, setData] = useState<DiskUsageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/diskinfo`);
        const diskUsage = response.data;

        setData((prevData) => [
          ...prevData,
          {
            timestamp: new Date(diskUsage.timestamp).toLocaleTimeString(),
            diskUsage: diskUsage.usage[0].usage,
          },
        ]);
      } catch (error) {
        console.error("Error fetching disk usage:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#EEF1F559] bg-opacity-30 border p-4 my-4 mr-[2.5rem]">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="diskUsage"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name="Disk Usage (%)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiskUsageGraph;
