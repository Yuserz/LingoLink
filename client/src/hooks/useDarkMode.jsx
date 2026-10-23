import { useContext } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";

export default function useDarkMode() {
  const { theme, setTheme } = useContext(MyGlobalContext);
  const colorTheme = theme === "dark" ? "light" : "dark";

  return [colorTheme, setTheme];
}
