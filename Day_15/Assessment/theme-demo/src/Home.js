import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ padding: 20 }}>
      <h1>Theme: {theme}</h1>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Home;
