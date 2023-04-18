import React from "react";
import Chat from "./Chat";
import Group from "./Group";
import logo from "../../assets/logo.svg";
export default function SideBar() {
  return (
    <>
      <div className="sidebar-container flex flex-col justify-center p-4 px-6 gap-8">
        <img src={logo} alt="" />
        <div className="chat">
          <Chat />
        </div>
        <div className="group">
          <Group />
        </div>
      </div>
    </>
  );
}
