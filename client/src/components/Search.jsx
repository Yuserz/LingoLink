import React from "react";
import search from "../assets/icons/search.svg";

export default function Search({ findContact, setEmail }) {
  return (
    <div className="search-bar w-full h-full flex dark:shadow-inner items-center p-2 px-4 bg-white dark:text-black dark:border-gray-700  dark:bg-gray-500/50 border border-solid rounded-2xl outline-gray-200 min-w-[220px] gap-2">
      <img src={search} alt="icon" />
      <input
        className="w-full outline-none m-2 bg-white/0"
        placeholder="Search contact"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && findContact();
        }}
      />
    </div>
  );
}
