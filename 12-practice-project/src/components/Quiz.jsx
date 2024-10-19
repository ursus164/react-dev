// -> Showing currently active question to the user
// -> Switching to the next question after user answear and registering user answears
import React from "react";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  //-> this is redundant because we can derive the current active quesiton by checking number of answers in the user answers state below. If 2 answers are given, the next question shown should be the third one
  //   const [ activeQuestionIndex, setActiveQuestionIndex ] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevState) => {
        return([...prevState,selectedAnswer]);
    })

  }

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
          return (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
