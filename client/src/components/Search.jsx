import React from "react";
import search from "../assets/icons/search.svg";

export default function Search({ findContact, setEmail }) {
  return (
    <div className="search-bar w-full h-full flex items-center p-2 px-4 bg-white border border-solid rounded-2xl outline-gray-200 min-w-[220px] gap-2">
      <img src={search} alt="icon" />
      <input
        className="w-full outline-none py-2 bg-white"
        placeholder="Search contacts email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && findContact();
        }}
      />
    </div>
  );
}
