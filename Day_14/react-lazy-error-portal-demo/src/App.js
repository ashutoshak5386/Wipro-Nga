import React, { Suspense, useState } from "react";
import "./App.css";
import loaderGif from "./loader.gif";
import ErrorBoundary from "./components/ErrorBoundary";
import ExplodingChild from "./components/ExplodingChild";
import PortalDemo from "./components/PortalDemo";

// Lazy load component with a forced 5-second delay
const LazyCounter = React.lazy(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import("./components/LazyCounter"));
    }, 5000); // 5 seconds
  })
);

function App() {
  const [showError, setShowError] = useState(false);

  return (
    <div className="App">
      <h1>React Demo: Lazy Loading, Error Boundaries & Portals</h1>

      {/* Lazy Loaded Counter with Loader for 5s */}
      <Suspense
        fallback={
          <div>
            <img src={loaderGif} alt="loading..." width={100} />
            <p>Loading counter... (please wait 5 seconds)</p>
          </div>
        }
      >
        <LazyCounter />
      </Suspense>

      {/* Error Boundary */}
      <ErrorBoundary>
        <button onClick={() => setShowError(true)}>Explode Child</button>
        {showError && <ExplodingChild />}
      </ErrorBoundary>

      {/* Portal */}
      <PortalDemo />
    </div>
  );
}

export default App;
