import { ArrowRightIcon } from "@heroicons/react/20/solid";
import React from "react";

interface DashboardPanelProps { }

export const DashboardPanel: React.FC<DashboardPanelProps> = () => {
  return (
    <div className="ml-[2.5rem] mr-[2.5rem]">
      <div className="flex space-x-2">
        <h2 className="text-xl font-bold text-gray-700">Resource Monitor</h2>
        <ArrowRightIcon className="w-6" />
      </div>
      <hr className="mb-6 mt-4"></hr>
      <div className="my-4">
        <div className="bg-[#EEF1F559] bg-opacity-30 border p-20">
          <div className="flex items-center justify-center">
            <a
              href="/monitor"
              className="bg-[#D50036] flex space-x-2 text-white py-2 px-4 rounded text-sm "
            >
              <span className="font-semibold">View Resources</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
