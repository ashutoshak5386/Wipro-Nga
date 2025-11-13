import { useState, useRef, useEffect } from "react";

export default function useTimer(initial = 0, running = false) {
  const [seconds, setSeconds] = useState(initial);
  const intervalRef = useRef(null);
  const isRunningRef = useRef(running);

  useEffect(() => {
    if (isRunningRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
      isRunningRef.current = true;
    }
  };
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      isRunningRef.current = false;
    }
  };
  const reset = (val = 0) => {
    setSeconds(val);
  };

  return { seconds, start, stop, reset };
}
