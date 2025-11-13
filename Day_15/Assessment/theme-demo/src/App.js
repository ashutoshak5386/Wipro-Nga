import React, { lazy, Suspense, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import Modal from "./components/Modal";
import WorkoutTracker from "./components/WorkoutTracker";
import Products from "./components/Products";

const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

function App() {
  // Day14 state
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([
    { title: "Users", value: 100, lastUpdated: "Today" },
    { title: "Sales", value: 200, lastUpdated: "Today" },
  ]);
  const simulateUpdate = () => {
    setData(prev => [{ ...prev[0], value: prev[0].value + 1 }, prev[1]]);
  };

  // Theme logic (Day15)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  // Offline banner
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {!isOnline && <div className="offline-banner">You are offline — some features may be unavailable</div>}

      <button className="btn theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div className={theme === "light" ? "light-mode container" : "dark-mode container"}>
        <h2>React Day 14 + Day 15 — Combined Project</h2>

        <div>
          <h4>🔹 Lazy Loading & Code Splitting</h4>
          <button className="btn" onClick={() => setShowCourse(true)}>View Course Details</button>
          <button className="btn" onClick={() => setShowInstructor(true)} style={{ marginLeft: 8 }}>View Instructor Profile</button>
          <Suspense fallback={<div>Loading...</div>}>
            {showCourse && <CourseDetails />}
            {showInstructor && <InstructorProfile />}
          </Suspense>
        </div>

        <div>
          <h4>🔹 Pure Components</h4>
          <button className="btn" onClick={simulateUpdate}>Simulate Update</button>
          <div className="stats-container">
            {data.map((d,i) => <StatsCard key={i} {...d} />)}
          </div>
        </div>

        <div>
          <h4>🔹 Error Boundary</h4>
          <ErrorBoundary>
            <div>Everything is running smoothly (no broken component inside).</div>
          </ErrorBoundary>
        </div>

        <div>
          <h4>🔹 React Portals</h4>
          <button className="btn" onClick={() => setOpenModal(true)}>Show Modal</button>
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h5>Hello from Portal!</h5>
            <p>This modal uses framer-motion + portal.</p>
            <button className="btn" onClick={() => setOpenModal(false)}>Close</button>
          </Modal>
        </div>

        <WorkoutTracker />
        <Products />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
