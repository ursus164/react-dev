import { useRef } from "react";

// Outputing list of shuffled answers
export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef(); // manage some value which will not change if the component function is executed again

  function shuffleQuestions(questionArray) {
    return questionArray.sort(() => {
      return Math.random() - 0.5; // negative value as a result shuffles values, the positive one keeps in the current order
    });
  }

  // spreading array of answers -> it is needed because sort executed directly on our answers array will modify that array directly. We have to create a copy of it and work on that copy. We also have to check the correct answer in the original array - so that's why we don't want to modify original array

  // when using ref, and it is initialized, the answer array will not change when we move on to the next question
  if (!shuffledAnswers.current) {
    // undefined, so we know that we do not have any shuffled answers because that is an initial state
    const answersArray = [...answers];
    shuffledAnswers.current = shuffleQuestions(answersArray);

    // once the answers are shuffled, they won't be shuffled again even though component function can execute (and will execute) again
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClasses = "";
        if (answerState === "answered" && answer === selectedAnswer) {
          cssClasses = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          answer === selectedAnswer
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
