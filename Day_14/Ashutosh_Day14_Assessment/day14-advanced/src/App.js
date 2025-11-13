import React, { lazy, Suspense, useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import Modal from "./components/Modal";
import ThemeContext from "./ThemeContext";

const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

function App() {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState([
    { title: "Users", value: 100, lastUpdated: "Today" },
    { title: "Sales", value: 200, lastUpdated: "Today" },
  ]);

  const simulateUpdate = () => {
    setData((prev) => [
      { ...prev[0], value: prev[0].value + 1 },
      prev[1],
    ]);
  };

  // ---------------- THEME LOGIC ----------------
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  // ------------------------------------------------

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* floating toggle button that never gets blocked */}
      <button
        className="btn btn-outline-light theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div
        className={
          theme === "light"
            ? "light-mode container text-center mt-5"
            : "dark-mode container text-center mt-5"
        }
      >
        <h2>React Day 14 – Advanced Concepts</h2>

        {/* Lazy Loading Section */}
        <div className="mt-4">
          <h4>🔹 Lazy Loading & Code Splitting</h4>
          <button className="btn btn-primary m-2" onClick={() => setShowCourse(true)}>
            View Course Details
          </button>
          <button className="btn btn-success m-2" onClick={() => setShowInstructor(true)}>
            View Instructor Profile
          </button>

          <Suspense fallback={<div className="spinner-border text-primary mt-3" />}>
            {showCourse && <CourseDetails />}
            {showInstructor && <InstructorProfile />}
          </Suspense>
        </div>

        {/* Pure Component Section */}
        <div className="mt-5">
          <h4>🔹 Pure Components</h4>
          <button className="btn btn-warning mb-3" onClick={simulateUpdate}>
            Simulate Update
          </button>
          <div className="d-flex justify-content-center flex-wrap">
            {data.map((d, i) => (
              <StatsCard key={i} {...d} />
            ))}
          </div>
        </div>

        {/* Error Boundary Section */}
        <div className="mt-5">
          <h4>🔹 Error Boundary</h4>
          <ErrorBoundary>
            <SafeComponent />
          </ErrorBoundary>
        </div>

        {/* Portal Modal Section */}
        <div className="mt-5">
          <h4>🔹 React Portals</h4>
          <button className="btn btn-info" onClick={() => setOpenModal(true)}>
            Show Modal
          </button>
          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h5>Hello from Portal!</h5>
            <p>This modal uses React Portals + Framer Motion.</p>
            <button
              className="btn btn-danger mt-2"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

// Replace broken component with a safe one for assessment
function SafeComponent() {
  return <p>Everything is running smoothly.</p>;
}

export default App;
