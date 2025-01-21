import quizCompleted from '../assets/quiz-complete.png';

export function Summary({ questions, selectedAnswers }) {
  const questionsAndAnswers = zip(questions, selectedAnswers);
  return (
    <div id="summary">
      <img src={quizCompleted} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{computeCorrectPercent(selectedAnswers)}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{computeWrongPercent(selectedAnswers)}%</span>
          <span className="text">answered incorrectly</span>
        </p>
        <p>
          <span className="number">{computeSkippedPercent(selectedAnswers)}%</span>
          <span className="text">skipped</span>
        </p>
      </div>
      <ol>
        {questionsAndAnswers.map(({ question, selectedAnswer }, index) => (
          <li key={question.id}>
            <h3>{index + 1}</h3>
            <p className="question">{question.text}</p>
            <p className={answerClass(selectedAnswer)}>{selectedAnswer.text ?? 'Skipped'}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function zip(questions, selectedAnswers) {
  return questions.map((question, index) => ({
    question,
    selectedAnswer: selectedAnswers[index],
  }));
}

function computeCorrectPercent(selectedAnswers) {
  const numAllAnswers = selectedAnswers.length;
  const numCorrectAnswers = selectedAnswers.filter((ans) => ans.text !== null && ans.correct).length;
  const percentage = (100 * (numCorrectAnswers / numAllAnswers)).toFixed(0);
  return percentage;
}

function computeWrongPercent(selectedAnswers) {
  const numAllAnswers = selectedAnswers.length;
  const numWrongAnswers = selectedAnswers.filter((ans) => ans.text !== null && !ans.correct).length;
  const percentage = (100 * (numWrongAnswers / numAllAnswers)).toFixed(0);
  return percentage;
}

function computeSkippedPercent(selectedAnswers) {
  const numAllAnswers = selectedAnswers.length;
  const numSkipped = selectedAnswers.filter((ans) => ans.text === null).length;
  const percentage = (100 * (numSkipped / numAllAnswers)).toFixed(0);
  return percentage;
}

function answerClass(selectedAnswer) {
  let className = 'user-answer';
  if (selectedAnswer.text !== null) {
    className += selectedAnswer.correct ? ' correct' : ' wrong';
  } else {
    className += ' skipped';
  }
  return className;
}
