import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen min-h-screen">
      <SideBar />
      <div className="flex flex-col w-full">
        <NavBar />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
