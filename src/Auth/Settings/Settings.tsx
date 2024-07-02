import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const Settings = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex">
          <Sidebar />
          <div className="w-full">Settings</div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
