import React, { useState, useRef } from "react";
import useTimer from "../hooks/useTimer";

export default function WorkoutTracker() {
  const { seconds, start, stop, reset } = useTimer(0, false);
  const [sets, setSets] = useState(0);
  const restRef = useRef(30);

  const startSet = () => {
    setSets(s => s + 1);
    reset(0);
    start();
  };

  const endSet = () => {
    stop();
    // auto rest countdown
    let rest = restRef.current;
    const rInterval = setInterval(() => {
      rest -= 1;
      if (rest <= 0) {
        clearInterval(rInterval);
        // ready for next set
      }
    }, 1000);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Workout Tracker</h3>
      <p>Sets completed: <b>{sets}</b></p>
      <p>Timer: <b>{seconds}s</b></p>
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={startSet}>Start Set</button>
        <button className="btn" onClick={endSet} style={{ marginLeft: 8 }}>End Set</button>
        <button className="btn" onClick={() => { reset(0); stop(); }} style={{ marginLeft: 8 }}>Reset</button>
      </div>
    </div>
  );
}
