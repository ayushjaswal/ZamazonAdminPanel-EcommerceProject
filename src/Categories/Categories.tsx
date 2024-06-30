import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const Categories: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <Sidebar />
          Categories
        </div>
      </div>
    </div>
  );
};

export default Categories;
