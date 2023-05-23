import React, { useState, useContext } from "react";
import arrowDown from "../assets/icons/arrowDown.svg";
import arrowDownWhite from "../assets/icons/arrowDownWhite.svg";
import LogoutModal from "./modals/LogoutModal";
import { MyGlobalContext } from "../context/MyGlobalContext";

export default function Logout() {
  const [showModal, setShowModal] = useState(false);
  const { name, theme } = useContext(MyGlobalContext);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative">
      <div className="flex capitalize dark:text-white dark:opacity-95 justify-center items-center gap-1">
        {/* <div className="bg-primary text-white w-8 shadow-sm border h-8 flex justify-center items-center rounded-full">
          {name.charAt(0)}
        </div> */}
        {name}
        <button
          onClick={handleModal}
          className={`flex min-w-fit items-center h-fit`}
        >
          <img
            className={`p-1 transition ease-in-out duration-300 ${
              showModal ? "rotate-180 " : ""
            }`}
            src={theme === "dark" ? arrowDownWhite : arrowDown}
            alt=""
          />
        </button>
      </div>
      {showModal ? <LogoutModal /> : ""}
    </div>
  );
}
