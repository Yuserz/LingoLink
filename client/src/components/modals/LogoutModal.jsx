import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/api";
import { MyDataContext } from "../../pages/Home";

export default function LogoutModal() {
  const navigate = useNavigate();
  const { setShowMessaging } = useContext(MyDataContext);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response) {
        //fix state bug issue
        setShowMessaging(false);
        // Clear session storage
        sessionStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={`logout-btn absolute transition ease-in-out duration-100 flex gap-2 bg-white right-0 shadow-sm border hover:scale-105 w-fit px-4 text-center rounded-md justify-center items-center h-fit p-2`}
      >
        <h1>Logout</h1>
      </button>
    </>
  );
}
