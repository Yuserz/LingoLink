import { useState, useEffect, useContext } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";

export default function useDarkMode() {
  // const [theme, setTheme] = useState(localStorage.theme);
  const { theme, setTheme } = useContext(MyGlobalContext);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
