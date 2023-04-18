import React, { useState } from "react";
import arrowDown from "../../assets/icons/arrowDown.svg";
import add from "../../assets/icons/add.svg";

export default function Chat() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded); 
  };

  return (
    <div
      className={`group-container bg-secondary rounded-md p-3 px-4 flex justify-between${
        expanded ? "expanded min-h-[150px] max-h-fit" : ""
      }`}
    >
      <div
        className={`flex items-center w-full justify-between h-fit ${
          expanded ? "pb-2 border-gray-300/80 border-b " : ""
        }`}
      >
        <button
          onClick={toggleExpanded}
          className="add-btn flex gap-2 items-center h-fit"
        >
          <img
            className={`${expanded ? "rotate-180" : ""}`}
            src={arrowDown}
            alt=""
          />
          <h2>Group</h2>
        </button>
        <button className="dropDown-btn h-fit">
          <img src={add} alt="" />
        </button>
      </div>
    </div>
  );
}
