import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // Initialize interval as undefined
    let interval: ReturnType<typeof setInterval> | undefined;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      // Clear interval if it has been set
      if (interval !== undefined) {
        clearInterval(interval);
      }
    }

    // Cleanup function to clear interval when component unmounts or running changes
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [running]);

  return (
    <div className="max-w-md flex flex-col items-center justify-center py-6">
      <h1 className="text-2xl font-semibold pb-2">REACT STOPWATCH</h1>

      <div className="text-xl font-semibold">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="flex flex-row justify-evenly space-x-4 mt-4">
        {running ? (
          <button
            className="border rounded-lg py-1 px-3.5"
            onClick={() => setRunning(false)}
          >
            Stop
          </button>
        ) : (
          <button
            className="border rounded-lg py-1 px-3"
            onClick={() => setRunning(true)}
          >
            Start
          </button>
        )}
        <button
          className="border rounded-lg py-1 px-2.5"
          onClick={() => setTime(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
