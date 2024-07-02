import React from "react";
import Sidebar from "../Sidebar/Sidebar";
const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex ">
          <Sidebar />
          <div className="w-full">Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
