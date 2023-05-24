import React from "react";
import StatusBtn from "./StatusBtn";
import DarkModeBtn from "./DarkModeBtn";
import Search from "./Search";
import Logout from "./Logout"


export default function Header() {
  return (
    <>
      <header className="flex justify-between mt-4 gap-4 items-center">
        <div className="w-1/2">
          {/* <Search /> */}
        </div>
        <div className="util-bar flex gap-6 items-center">
          {/* <StatusBtn /> */}
          <DarkModeBtn />
          <Logout />
        </div>
      </header>
    </>
  );
}
