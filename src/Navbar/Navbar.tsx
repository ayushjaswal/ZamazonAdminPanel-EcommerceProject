import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import React from "react";


const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.authUser);
  return (
    <nav className="p-4 flex flex-row items-center justify-between border-b-[1px] border-gray-300 h-[3rem]">
      <div>

      </div>
      <div className="flex items-center">
        <div className="mx-1 flex flex-col items-end">
          {user.name}
          <div className="text-[12px] text-gray-500">{user.email}</div>
        </div>
        <div className="border-[0.1rem] mx-1 border-purple-300 rounded-[1rem]">
          <img src={user.profile} className="h-[30px] rounded-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
