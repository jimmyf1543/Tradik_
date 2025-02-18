import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TitleBar from "./TitleBar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-col flex-1">
        <TitleBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <div className={`flex-1 p-6 bg-white ${isSidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;