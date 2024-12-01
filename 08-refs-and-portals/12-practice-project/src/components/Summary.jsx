import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnwersShare =
    Math.round(skippedAnswers.length / userAnswers.length) * 100;

    const correctAnwersShare =
    Math.round(correctAnswers.length / userAnswers.length) * 100;

    const wrongAnswersShare = 100 - skippedAnwersShare - correctAnwersShare
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {skippedAnwersShare + '%'}
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnwersShare + '%'}</span>
          <span className="text">correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare + '%'}</span>
          <span className="text">incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClasses = "user-answer ";
          if (answer === QUESTIONS[index].answers[0]) {
            cssClasses += "correct";
          } else if (answer === null) {
            cssClasses += "skipped";
          } else {
            cssClasses += "wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="quesiton">{QUESTIONS[index].text}</p>
              <p className={cssClasses}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
