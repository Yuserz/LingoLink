import React, { useContext, useEffect } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { useNavigate } from "react-router-dom";
import arrowDown from "../assets/icons/arrowDown.svg";

export default function Lagout() {
  const { set_id, setUserData } = useContext(MyGlobalContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logout();

      //clear session records
      set_id(null);
      setUserData(null);
      localStorage.removeItem("token");

      // Redirect the user to the login page or any other desired page.
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div>
      <button
        // onClick={toggleExpanded}
        onClick={logout}
        className={`add-btn flex gap-2 items-center h-fit p-2`}
      >
        <img
          className="p-2"
          // className={`p-1 ${showContacts ? "rotate-180 " : ""}`}
          src={arrowDown}
          alt=""
        />
        <h1>username</h1>
      </button>
    </div>
  );
}
