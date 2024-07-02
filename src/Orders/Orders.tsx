import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
const Orders: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex">
          <Sidebar />
          <div className="w-full">
          Orders
            </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
