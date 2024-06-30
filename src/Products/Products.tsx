import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Products: React.FC = () => {
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <Sidebar />
          Products
        </div>
      </div>
    </div>
  );
};

export default Products;
