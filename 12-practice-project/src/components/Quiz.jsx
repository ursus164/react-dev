// -> Showing currently active question to the user
// -> Switching to the next question after user answear and registering user answears

import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 15000;

export default function Quiz() {
  //-> this is redundant because we can derive the current active quesiton by checking number of answers in the user answers state below. If 2 answers are given, the next question shown should be the third one
  //   const [ activeQuestionIndex, setActiveQuestionIndex ] = useState(0);

  const shuffledAnswers = useRef(); // manage some value which will not change if the component function is executed again
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("unanswered");
  const activeQuestionIndex =
    answerState === "unanswered" ? userAnswers.length : userAnswers.length - 1; // when we click on the question, we do not want to immediately move forward to the next one, but to stick for a while with the current one

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // We are using useCallback because we want to make sure that the following functions are not recreated because the surrounding component function was executed again
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      // change color os selected answer
      setAnswerState("answered");

      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer]; // appending new answer
      });

      setTimeout(() => {
        // change answer state to 'correct' or 'wrong' -> it will be used to update styling of the answer
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          // correct answer was chosen
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("unanswered"); // resetting answer state in order for the logic in activeQuestionIndex to work properly and move to the next question
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  ); // function must be recreated whenever the active question index value changes, because we use that value in the function body -> we don't want to use outdated value here

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

  // when using ref, and it is initialized, the answer array will not change when we move on to the next question
  if(!shuffledAnswers.current) {
    // undefined, so we know that we do not have any shuffled answers because that is an initial state
    const answers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current = shuffleQuestions(answers);

    // once the answers are shuffled, they won't be shuffled again even though component function can execute (and will execute) again
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClasses = "";

            if (
              answerState === "answered" &&
              answer === userAnswers[userAnswers.length - 1]
            ) {
              cssClasses = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              answer === userAnswers[userAnswers.length - 1]
            ) {
              cssClasses = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}>
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
