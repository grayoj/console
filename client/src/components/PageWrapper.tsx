import React, { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <main className="ml-[20rem] my-6">{children}</main>;
};
