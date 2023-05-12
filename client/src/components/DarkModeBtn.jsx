import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeBtn() {
  const [colorTheme, setTheme] = useDarkMode();

  const [check, setCheck] = useState(
    localStorage.theme === "light" ? false : true
  );

  const toggleDarkMode = () => {
    setCheck((prevState) => !prevState);
    setTheme(colorTheme);
  };

  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        checked={check}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div
        className="flex flex-row gap-x-1 p-1 justify-between items-center 
                    w-16 h-7 dark:peer-focus:ring-blue-800 rounded-full peer bg-gray-300 
                    peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 
                    peer-checked:after:left-[11px]
                    peer-checked:after:bg-zinc-500 after:bg-white after:rounded-full after:h-6 
                    after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-700"
      >
        <svg
          className="w-5 h-5"
          fill="#FFFF99"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          className="w-5 h-5"
          fill="#333333"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </div>
    </label>
  );
}
