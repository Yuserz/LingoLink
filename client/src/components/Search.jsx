import React, { useState } from "react";
import search from "../assets/icons/search.svg";

export default function Search({ findContact, setSearchEmail }) {
  const [searchValue, setSearchValue] = useState(""); // Add local state for the search input value

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchEmail(searchValue.toLowerCase());
      findContact();
    }
  };

  return (
    <div className="search-bar w-full h-full flex dark:shadow-inner items-center p-2 px-4 bg-white dark:text-black dark:border-gray-700  dark:bg-gray-500/50 border border-solid rounded-2xl outline-gray-200 min-w-[220px] gap-2">
      <img src={search} alt="icon" />
      <input
        className="w-full outline-none m-2 bg-white/0 rounded-md"
        placeholder="Search contact by email"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
