import { Menu, Transition } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface HorizontalNavigationBarProps {
  name: string;
}

export const HorizontalNavigationBar: React.FC<
  HorizontalNavigationBarProps
> = () => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="bg-[#EEF1F559] bg-opacity-30 border-b ml-[18rem]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div className="ml-[70rem] flex space-x-4">
                <Menu.Button className="relative flex rounded-full text-sm focus:outline-none">
                  <span className="absolute -inset-1.5" />
                  <Cog6ToothIcon className="h-6 text-gray-600" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700",
                        )}
                      >
                        View on Github
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
