import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <Sidebar />
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
