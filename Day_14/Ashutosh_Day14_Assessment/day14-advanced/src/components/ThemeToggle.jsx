import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={() => {
        console.log("ThemeToggle clicked. theme:", theme);
        toggleTheme();
      }}
      style={{
        position: "relative",
        zIndex: 9999,
        borderRadius: 20,
        padding: "8px 12px",
      }}
      className={theme === "light" ? "btn btn-outline-dark" : "btn btn-outline-light"}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? " Dark" : " Light"}
    </button>
  );
}