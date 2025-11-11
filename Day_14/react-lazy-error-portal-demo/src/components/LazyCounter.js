import React, { useEffect, useState } from "react";

const LazyCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Auto Counter: {count}</h2>
    </div>
  );
};

export default LazyCounter;
