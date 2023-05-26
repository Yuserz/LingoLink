import React, { useContext} from "react";
import ChatList from "./private/ChatList";
import logo from "../../assets/logo.svg";
import logoWhite from "../../assets/logoWhite.svg";
import Footer from "./Footer";
import { MyGlobalContext } from "../../context/MyGlobalContext";

export default function SideBar() {
  const { theme } = useContext(MyGlobalContext);
  return (
    <>
      <div className="sidebar-container flex flex-col justify-center p-4 px-6 gap-8 h-full">
        <img src={theme === "dark" ? logoWhite : logo} alt="" />
        <div className="chat flex flex-col justify-between h-full">
          <ChatList />
          <Footer />
        </div>
      </div>
    </>
  );
}
