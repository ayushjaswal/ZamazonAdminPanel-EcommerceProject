import React, { useState } from "react";
import "./Sidebar.css";
import SidebarComponent from "./SidebarComponent";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogout } from "../store/features/Auth";
import { AppDispatch, RootState } from "../store/store";
const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.authUser);
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
    <div className="md:flex flex-col items-start hidden md:visible gap-5 h-[100vh] bg-gray-100 md:w-1/5 ">
      <SidebarComponent
        path="/dashboard"
        Title="Dashboard"
        classValue={
          "flex w-full text-left p-4 px-2 slide " +
          (currentBoard.includes("dashboard")
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
          (currentBoard.includes("products")
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
          (currentBoard.includes("categories")
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
          (currentBoard.includes("orders")
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
      <div className="w-full ">
        <div className="flex items-center justify-center mx-1 rounded-[1rem]">
          <img src={user.profile} className="h-[70px] rounded-full" />
        </div>
        <div className="flex items-center justify-center w-full text-center">
          <div className="mx-1 flex flex-col items-center">
            {user.name}
            <div className="text-[12px] text-gray-500 break-words w-[100px]">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
