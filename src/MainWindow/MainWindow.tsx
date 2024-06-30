import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const MainWindow: React.FC = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex">
      <Sidebar />
      
      </div>
    </div>
  );
};

export default MainWindow;
