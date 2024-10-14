import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    const intervalPtr = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("Cleaning up inteval");
      clearInterval(intervalPtr); // clearing for performance purposes
      // When the interval is managed in DeleteConfirmation component, we are updating the state every 10 miliseconds, which means that the whole component runs every 10 miliseconds, which also means that every 10 miliseconds react has to compare the 'onConfirm' value in the timeout useEffect dependency to figure out whether the timeout function should run again and it has to evaluate the whole returned JSX code.
    };
  }, []);
  // defines a function that will be executed every couple of miliseconds
  return <progress value={remainingTime} max={timer} />;
}
