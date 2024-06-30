import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
const Orders: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <Sidebar />
          Orders
        </div>
      </div>
    </div>
  );
};

export default Orders;
