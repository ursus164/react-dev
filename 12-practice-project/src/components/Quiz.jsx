// -> Showing currently active question to the user
// -> Switching to the next question after user answear and registering user answears

import React, { useCallback } from "react";
import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  //-> this is redundant because we can derive the current active quesiton by checking number of answers in the user answers state below. If 2 answers are given, the next question shown should be the third one
  //   const [ activeQuestionIndex, setActiveQuestionIndex ] = useState(0);

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

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
      key={activeQuestionIndex} // we have to reset all question component
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
