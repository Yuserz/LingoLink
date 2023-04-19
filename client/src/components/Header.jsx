import React from "react";
import StatusBtn from "./StatusBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";

export default function Header() {
  return (
    <>
      <header className="flex justify-between mt-4 gap-4 items-center">
        <div className="w-1/2">
          <Search />
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
