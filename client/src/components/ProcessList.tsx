import React, { useState, useEffect } from "react";
import axios from "axios";
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid";
import { baseUrl } from "../url";

interface Process {
  pid: string;
  name: string;
  total_pages: any;
}

interface ProcessListProps {
  pageSize: number;
}

const ProcessList: React.FC<ProcessListProps> = ({ pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    try {
      const response = await axios.get<{
        processes: Process[];
        total_pages: number;
      }>(
        `${baseUrl}/activity?page=${currentPage}&pageSize=${pageSize}&timestamp=${Date.now()}`,
      );

      setProcesses(response.data.processes);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching process data:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 bg-[#EEF1F559] bg-opacity-30 border mr-[2.5rem]">
      <h2 className="text-xl font-bold mb-4">
        Running Processes ({totalPages})
      </h2>
      <div className="my-6 flex justify-end">
        <button className="px-4 py-2 mr-2 bg-[#D50036] rounded-md text-sm text-white">
          Kill Process
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {processes.map((process) => (
          <div
            key={process.pid}
            className="bg-white p-4 rounded border-gray-100 border flex items-center"
          >
            <ViewfinderCircleIcon className="h-4 mr-4" />
            <div>
              <p className="text-sm font-bold">PID: {process.pid}</p>
              <p className="text-sm text-gray-500">
                Process Name:{" "}
                <span className="font-semibold">{process.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 mr-2 bg-[#D50036] rounded-md text-sm text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-[#D50036] rounded-md text-sm text-white"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProcessList;
