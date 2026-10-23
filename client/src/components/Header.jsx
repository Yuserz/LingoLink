import React from "react";
import DarkModeBtn from "./DarkModeBtn";
import Logout from "./Logout";

export default function Header() {
  return (
    <header className="flex justify-end mt-4 gap-4 items-center">
      <div className="util-bar flex gap-6 items-center">
        <DarkModeBtn />
        <Logout />
      </div>
    </header>
  );
}
