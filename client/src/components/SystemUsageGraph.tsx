import { useState, useEffect } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import axios from "axios";
import { baseUrl } from "../url";

const SystemUsageGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/systemusage`);
        const systemUsage = response.data;

        setData((prevData): any => [
          ...prevData,
          {
            timestamp: new Date(
              systemUsage.timestamp * 1000,
            ).toLocaleTimeString(),
            cpuUsage: systemUsage.cpu_usage,
            memoryUsage: systemUsage.memory_used / (1024 * 1024),
          },
        ]);
      } catch (error) {
        console.error("Error fetching system usage:", error);
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
            dataKey="cpuUsage"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name="CPU Usage (%)"
          />
          <Area
            type="monotone"
            dataKey="memoryUsage"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
            name="Memory Usage (MB)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SystemUsageGraph;
