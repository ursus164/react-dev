import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import { act, useState } from "react";
import QUESTIONS from "../questions.js";

const TIMER = 15000;

export default function Question({
  onSelectAnswer,
  onSkipAnswer,
  activeIndex
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[activeIndex].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if(answer.selectedAnswer) {
    answerState = 'answered'
  }

  return (
    <div id="question">
      <h2>{QUESTIONS[activeIndex].text}</h2>
      <Answers
        // key={activeQuestionIndex + 100} // we are forcing react to destroy and recreate component to fix bug where questions were not changed after highlithing the answer
        answers={QUESTIONS[activeIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
      {/* The onTimeout function trigerred error where progress bar was not reseting. When the function is created it is a new object in memory. So every time jsx code in this quiz component, a new function gets created */}
      <ProgressBar
        timeout={TIMER}
        onTimeout={onSkipAnswer}
        // key={activeQuestionIndex} // whenever index changes, it will triger the component to unmount and mount again
      />
    </div>
  );
}
