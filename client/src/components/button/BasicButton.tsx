import React, { ReactNode } from "react";

interface BasicButtonProps {
  children?: ReactNode;
  className?: string;
  onClick: () => void;
}

export const BasicButton: React.FC<BasicButtonProps> = ({
  children,
  className,
}) => {
  const buttonClassName = `text-white py-2 px-4 rounded text-sm ${className || ""
    }`;

  return <button className={buttonClassName}>{children}</button>;
};
