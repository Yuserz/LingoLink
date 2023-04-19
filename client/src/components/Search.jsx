import React from "react";
import search from "../assets/icons/search.svg";
export default function Search() {
  return (
    <div className="search-bar w-full h-full flex items-center p-2 px-4 bg-white border border-solid rounded-2xl outline-gray-200 min-w-[220px] gap-2">
      <img src={search} alt="icon" />
      <input
        className="w-full outline-none py-2"
        placeholder="Search contact or number"
        type="text"
      />
    </div>
  );
}
