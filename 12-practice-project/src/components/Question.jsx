import ProgressBar from "./ProgressBar";
import Answers from "./Answers";

const TIMER = 15000;

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <h2>{questionText}</h2>
      <Answers
        // key={activeQuestionIndex + 100} // we are forcing react to destroy and recreate component to fix bug where questions were not changed after highlithing the answer
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
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
