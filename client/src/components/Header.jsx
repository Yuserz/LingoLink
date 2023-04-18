import React from "react";
import StatusBtn from "./StatusBtn";
import DarkModeBtn from "./DarkModeBtn";
import search from "../assets/icons/search.svg"

export default function Header() {
  return (
    <>
      <header className="flex justify-between mt-4 gap-4 items-center">
        <div className="search-bar flex items-center p-2 px-4 bg-white border border-solid rounded-2xl outline-gray-200 w-1/2 min-w-[220px] gap-2">
          <img src={search} alt="icon" />
          <input
          className="w-full outline-none py-2"
            placeholder="Search contact here.."
            type="text"
          />
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
