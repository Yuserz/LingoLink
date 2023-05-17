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
      <button
        onClick={handleModal}
        className={`flex min-w-fit items-center h-fit p-2`}
      >
        <img
          className={`p-2 transition ease-in-out duration-300 ${
            showModal ? "rotate-180 " : ""
          }`}
          src={theme === "dark" ? arrowDownWhite : arrowDown }
          alt=""
        />
        <h1 className="flex capitalize dark:text-white dark:opacity-95">
          {name}
        </h1>
      </button>
      {showModal ? <LogoutModal /> : ""}
    </div>
  );
}
