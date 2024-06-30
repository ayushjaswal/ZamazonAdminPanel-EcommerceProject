import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const Settings = () => {
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <Sidebar />
          Settings
        </div>
      </div>
    </div>
  );
};

export default Settings;
