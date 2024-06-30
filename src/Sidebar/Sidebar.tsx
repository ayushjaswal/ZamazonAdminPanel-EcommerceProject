import React, { useState } from "react";
import "./Sidebar.css";
import SidebarComponent from "./SidebarComponent";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLogout } from "../store/features/Auth";
import { AppDispatch } from "../store/store";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [currentBoard, setCurrentBoard] = useState(
    location.pathname.substring(1, location.pathname.length)
  );
  const dispatch = useDispatch<AppDispatch>();
  function handleLogout() {
    try {
      dispatch(asyncLogout());
    } catch (err) {
      Error("There was an error");
    }
  }
  return (
    <div className="flex flex-col items-start gap-5 h-[100vh] bg-gray-100 w-1/5 ">
      <SidebarComponent
        path="/dashboard"
        Title="Dashboard"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard === "dashboard"
            ? " bg-primary-blue text-white px-4 "
            : " ")
        }
        setCurrentBoard={setCurrentBoard}
      />
      <SidebarComponent
        path="/products"
        Title="Products"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard === "products"
            ? " bg-primary-blue text-white px-4 "
            : " ")
        }
        setCurrentBoard={setCurrentBoard}
      />
      <SidebarComponent
        path="/categories"
        Title="Categories"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard === "categories"
            ? " bg-primary-blue text-white px-4 "
            : " ")
        }
        setCurrentBoard={setCurrentBoard}
      />
      <SidebarComponent
        path="/orders"
        Title="Orders"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard === "orders"
            ? " bg-primary-blue text-white px-4 "
            : " ")
        }
        setCurrentBoard={setCurrentBoard}
      />
      <SidebarComponent
        path="/settings"
        Title="Settings"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard === "settings"
            ? " bg-primary-blue text-white px-4 "
            : " ")
        }
        setCurrentBoard={setCurrentBoard}
      />
      <div className="flex items-center w-full justify-center">
        <button
          onClick={() => handleLogout()}
          className=" bg-slate-300 p-2 rounded-md hover:bg-slate-400 transition ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
