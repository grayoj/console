import React from "react";

interface FooterProps {
  status: "healthy" | "warning" | "error";
}

const Footer: React.FC<FooterProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="ml-[1.5rem] mr-[1.5rem]">
      <footer className="bg-[#EEF1F559] bg-opacity-30 border text-gray-700 py-4">
        <div className="container mx-auto flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor()}`} />
          <p>Systems Healthy</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
