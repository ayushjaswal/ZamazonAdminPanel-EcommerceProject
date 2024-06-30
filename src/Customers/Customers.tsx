import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Customers: React.FC = () => {
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

export default Customers;
