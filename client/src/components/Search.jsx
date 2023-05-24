import React from "react";
import search from "../assets/icons/search.svg";

export default function Search({ findContact, setSearchEmail, searchEmail }) {
  return (
    <div className="search-bar w-full h-full flex  dark:shadow-inner items-center p-2 px-4 bg-white dark:text-black dark:border-gray-700  dark:bg-gray-500/50 border border-solid rounded-2xl outline-gray-200 min-w-[220px] gap-2">
      {/* <img className="" src={search} alt="icon" /> */}
      <svg
        className="dark:fill-white fill-black w-6 h-6 opacity-50"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6293 12.8459L10.8728 10.0894C11.5365 9.20586 11.8947 8.13047 11.8935 7.02549C11.8935 4.20303 9.59721 1.90674 6.77475 1.90674C3.95229 1.90674 1.65601 4.20303 1.65601 7.02549C1.65601 9.84795 3.95229 12.1442 6.77475 12.1442C7.87974 12.1454 8.95513 11.7872 9.83862 11.1235L12.5952 13.8801C12.7347 14.0048 12.9167 14.0714 13.1038 14.0662C13.2909 14.0609 13.4688 13.9843 13.6012 13.8519C13.7335 13.7196 13.8102 13.5416 13.8154 13.3545C13.8207 13.1674 13.7541 12.9854 13.6293 12.8459ZM3.11851 7.02549C3.11851 6.30235 3.33294 5.59545 3.73469 4.99418C4.13645 4.39292 4.70748 3.92429 5.37557 3.64755C6.04366 3.37082 6.77881 3.29841 7.48805 3.43949C8.1973 3.58057 8.84878 3.92879 9.36011 4.44013C9.87145 4.95146 10.2197 5.60294 10.3607 6.31219C10.5018 7.02143 10.4294 7.75658 10.1527 8.42467C9.87595 9.09276 9.40732 9.66379 8.80606 10.0655C8.20479 10.4673 7.49789 10.6817 6.77475 10.6817C5.80541 10.6806 4.87611 10.295 4.19068 9.60956C3.50525 8.92413 3.11967 7.99483 3.11851 7.02549Z"
        />
      </svg>

      <input
        className="w-full outline-none m-2 bg-white/0 rounded-md dark:text-white/90"
        placeholder="Search contact by email"
        type="text"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && findContact();
        }}
        key={searchEmail} // Add key prop to force re-render and clear input
      />
    </div>
  );
}
