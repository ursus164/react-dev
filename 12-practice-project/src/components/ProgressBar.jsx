import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('SETTING TIMEOUT')
    const timePtr = setTimeout(onTimeout,timeout);
    return () => {
        clearTimeout(timePtr);
    }
  }, [timeout,onTimeout]) // we have to make sure that the effect function above executes again when one of the dependencies changed. That makes sense because we want to reset the timer and set it again
 

  useEffect(() => {
    // updating progress bar every 10 miliseconds - and preventing infinite loop
    console.log('SETTING INTERVAL')
    const intervalPtr = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(intervalPtr);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode} />;
}

// The bug in which the progress bar value was not resetted was due to the fact that this component was used in the quiz component. And when we move to the next question, we do that by storing a user answer, and then the active question index change because the length of userAnswers changed. So the returned JSX code in the quiz component gets updated, but the Progress Bar component is not being re executed because it did not changed - it was a part of the DOM before, and it is still part of the DOM now.The only things that changed was active question text that is being displayed and the answers that are displayed

// The KEY prop added to the progress bar in the quiz component fixes that problem. The key prop has powerful feature. Whenever its value changes, react will destroy the old component instance, and create a new one - it will UNMOUNT and REMOUNT it again
