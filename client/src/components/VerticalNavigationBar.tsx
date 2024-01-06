import React from "react";

interface VerticalNavigationProps { }

import {
  ChartBarIcon,
  CircleStackIcon,
  Squares2X2Icon,
  WifiIcon,
} from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";

const VerticalNavigationData = [
  {
    name: "Control Panel",
    current: true,
    href: "/",
    icon: Squares2X2Icon,
  },

  {
    name: "System Storage",
    current: true,
    href: "/storage",
    icon: CircleStackIcon,
  },
  {
    name: "Networks",
    current: true,
    href: "/network",
    icon: WifiIcon,
  },
  {
    name: "Monitoring",
    current: true,
    href: "/monitor",
    icon: ChartBarIcon,
  },
];

export const VerticalNavigation: React.FC<VerticalNavigationProps> = () => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  const location = useLocation();
  return (
    <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-[#EEF1F559] bg-opacity-30 border">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="flex justify-center items-center mx-12 mt-8 mb-2">
              <a href="/">
                <img
                  src="/logo.svg"
                  height={150}
                  width={150}
                  alt="Suburban Logo"
                />
              </a>
            </div>
          </div>

          <nav className="pt-8 mt-5 flex-1 space-y-2 px-1">
            {VerticalNavigationData.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "text-[#D50036] font-semibold"
                      : "text-gray-700",
                    "group w-full flex items-center pl-2 pr-1 py-4 text-left text-lg text-gray-600 rounded-md space-x-2 focus:outline-none mx-4",
                  )}
                >
                  <span className="flex items-center">
                    {item.icon && (
                      <item.icon
                        className={classNames(
                          "w-5 h-5 mr-2",
                          location.pathname === item.href
                            ? "text-[#D50036] hover:text-[#D50036]"
                            : "text-gray-700 hover:text-gray-600",
                        )}
                      />
                    )}{" "}
                    {item.name}
                  </span>
                </a>
              </div>
            ))}
          </nav>
          <hr />
          <span className="my-2 text-center">
            &copy; Copyright Console, 2023{" "}
          </span>
        </div>
      </div>
    </aside>
  );
};
