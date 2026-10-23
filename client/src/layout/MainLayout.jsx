import React from "react";
import SideBar from "../components/sidebar/SideBar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="home-container flex flex-col md:flex-row w-full h-screen overflow-y-auto md:overflow-hidden dark:bg-gray-700 dark:text-white">
        <div className="sidebar bg-primary dark:bg-black w-full shrink-0 max-h-[45vh] overflow-y-auto md:w-[20%] md:min-w-[250px] md:max-h-none md:overflow-y-visible">
          <SideBar />
        </div>
        <div className="flex flex-col flex-1 min-w-0 min-h-0 mx-4 pb-4">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
