import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../url";

export const Card = ({
  text,
  detail,
  color,
  textColor,
  detailColor,
  countColor,
  count,
}: {
  text: string;
  detail: string;
  color: string;
  textColor: string;
  detailColor: string;
  countColor: string;
  count: string;
}) => {
  const cardClasses = `${color} rounded-sm overflow-hidden m-4 py-10 flex`;
  const textClasses = `text-base ${textColor}`;
  const detailClasses = `text-xs ${detailColor}`;
  const countClasses = `text-lg ${countColor}`;
  return (
    <div className={cardClasses}>
      <div className="p-4">
        <div className={countClasses}>{count}</div>
        <div className={textClasses}>{text}</div>
        <div className={detailClasses}>{detail}</div>
      </div>
      <div className="ml-10 mt-10">
        <UserIcon />
      </div>
    </div>
  );
};

export const DashboardCardRow: React.FC = () => {
  const [cpuCount, setCpuCount] = useState<number>(0);
  const [memoryCount, setMemoryCount] = useState<string>("");
  const [kernelCount, setKernelCount] = useState<string>("");

  const formatMemoryForDisplay = (memorySize: any) => {
    if (memorySize.includes("Unknown")) {
      return "Unknown";
    }

    const numericValue = parseFloat(memorySize.match(/\d+/)[0]);

    if (memorySize.includes("GB")) {
      return `${numericValue} GB`;
    }

    return memorySize;
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/system`)
      .then((response) => {
        const data = response.data;

        setCpuCount(data.cpus);
        setMemoryCount(formatMemoryForDisplay(data.total_memory));
        setKernelCount(data.kernel);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-4">
        <Card
          textColor="text-white"
          countColor="text-white"
          detailColor="text-white"
          text="CPUs"
          detail="Total Number of CPU Cores"
          color="bg-[#D50036]"
          count={cpuCount.toString()}
        />
        <Card
          textColor="text-black"
          countColor="text-black"
          detailColor="text-black"
          text="Memory"
          detail="Total Memory on the machine"
          color="bg-[#EEF1F559] bg-opacity-30 border"
          count={memoryCount}
        />
        <Card
          textColor="text-black"
          countColor="text-black"
          detailColor="text-black"
          text="Disk Usage"
          detail="Total disk usage in number"
          color="bg-[#EEF1F559] bg-opacity-30 border"
          count="20.5"
        />
        <Card
          textColor="text-black"
          countColor="text-black"
          detailColor="text-black"
          text="Kernel"
          detail="Kernel version number specification"
          color="bg-[#EEF1F559] bg-opacity-30 border"
          count={kernelCount}
        />
      </div>
    </div>
  );
};
