import React from "react";
import StatusBtn from "./StatusBtn";
import DarkModeBtn from "./DarkModeBtn";

export default function Header() {
  return (
    <>
      <header className="flex justify-between">
        <div className="search-bar">
          <input placeholder="search contact here.." type="text" />
        </div>
        <div className="util-bar flex gap-2">
          <StatusBtn />
          <DarkModeBtn />
          <div className="Logout flex gap-1">
            <img src="" alt="icon" />
            <div className="user-name">user</div>
          </div>
        </div>
      </header>
    </>
  );
}
