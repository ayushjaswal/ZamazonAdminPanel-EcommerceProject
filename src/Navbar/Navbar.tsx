import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { asyncLogout } from "../store/features/Auth";
import { useLocation } from "react-router-dom";
import SidebarComponent from "../Sidebar/SidebarComponent";
import { styled } from "@mui/material";

const FullWidthSwipeableDrawer = styled(SwipeableDrawer)({
  '& .MuiDrawer-paper': {
    width: '80%',
  },
});


const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.authUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <nav className="p-4 flex flex-row items-center justify-between border-b-[1px] border-gray-300 h-[3rem] w-full">
      <div>
        <DashboardRounded onClick={() => setDrawerOpen(true)} />
        <FullWidthSwipeableDrawer
          anchor={"left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          // swipeAreaWidth={"100%"}
        >
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
        </FullWidthSwipeableDrawer>
      </div>
      <div className="text-xs flex items-center">
        <div className="mx-1 flex flex-col items-end">
          {user.name}
          <div className="text-[6px] text-gray-500">{user.email}</div>
        </div>
        <div className="border-[0.1rem] mx-1 border-purple-300 rounded-[1rem]">
          <img src={user.profile} className="h-[30px] rounded-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
