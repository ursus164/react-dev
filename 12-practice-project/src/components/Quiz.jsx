// -> Showing currently active question to the user
// -> Switching to the next question after user answear and registering user answears

import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 15000;

export default function Quiz() {
  //-> this is redundant because we can derive the current active quesiton by checking number of answers in the user answers state below. If 2 answers are given, the next question shown should be the third one
  //   const [ activeQuestionIndex, setActiveQuestionIndex ] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // We are using useCallback because we want to make sure that the following functions are not recreated because the surrounding component function was executed again
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer]; // appending new answer
    });
  },
  []); // no dependencies because state updating functions don't have to be added, because react guarantees that they never change. In the handleSelectAnswer func, we do not use any state or props and also not any other values that depend on state or props

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  function shuffleQuestions(questionArray) {
    return questionArray.sort(() => {
      return Math.random() - 0.5; // negative value as a result shuffles values, the positive one keeps in the current order
    });
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // spreading array of answers -> it is needed because sort executed directly on our answers array will modify that array directly. We have to create a copy of it and work on that copy. We also have to check the correct answer in the original array - so that's why we don't want to modify original array
  const answers = [...QUESTIONS[activeQuestionIndex].answers];
  const shuffledAnswers = shuffleQuestions(answers);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
        {/* The onTimeout function trigerred error where progress bar was not reseting. When the function is created it is a new object in memory. So every time jsx code in this quiz component, a new function gets created */}
        <ProgressBar
          timeout={TIMER}
          onTimeout={handleSkipAnswer}
          key={activeQuestionIndex} // whenever index changes, it will triger the component to unmount and mount again
        />
      </div>
    </div>
  );
}
