// FileSystemViewer.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../url";

const FileSystemViewer: React.FC = () => {
  const [fileSystem, setFileSystem] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/system`);
        const systemInfo = response.data;

        setFileSystem(systemInfo.file_system);
      } catch (error) {
        console.error("Error fetching file system:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[#EEF1F559] bg-opacity-30 border mr-[2.5rem]">
      <h2 className="text-md font-semibold">System Volumes</h2>
      {fileSystem.map((directory) => (
        <div key={directory} className="bg-white border p-4">
          <p className="text-gray-700">{directory}</p>
        </div>
      ))}
    </div>
  );
};

export default FileSystemViewer;
