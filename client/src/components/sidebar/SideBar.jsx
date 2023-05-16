import React from "react";
import Chat from "./Chat";
import logo from "../../assets/logo.svg";
import Footer from "./Footer";

export default function SideBar() {
  return (
    <>
      <div className="sidebar-container flex flex-col justify-center p-4 px-6 gap-8 h-full">
        <img src={logo} alt="" />
        <div className="chat flex flex-col justify-between h-full">
          <Chat />
          <Footer />
        </div>
        {/* <div className="group">
          <Group />
        </div> */}
      </div>
    </>
  );
}
