import { useRef, useState } from 'react';
import { QuestionTimer } from './QuestionTimer';

export function Question({ question, answers, onSelectAnswer, timeoutSeconds = 15, delaySeconds = 2 }) {
  // Store shuffled answers in a ref to prevent them from being reshuffled when the user selects an answer.
  const shuffledAnswers = useRef(shuffle(answers));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const hasSelectedAnswer = selectedAnswer !== null;

  const handleSelectAnswer = (answer) => {
    if (answer !== null) {
      // Display whether the selected answer was correct or not before submitting it to the caller.
      const result = { text: answer, correct: isCorrectAnswer(answer, answers) };
      setSelectedAnswer(result);
      setTimeout(() => onSelectAnswer(result), delaySeconds * 1000);
    } else {
      const result = { text: null, correct: false };
      onSelectAnswer(result);
    }
  };

  return (
    <>
      <div id="question">
        <QuestionTimer
          active={!hasSelectedAnswer}
          timeoutSeconds={timeoutSeconds}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{question}</h2>
      </div>
      <ol id="answers">
        {shuffledAnswers.current.map((answer, index) => (
          <li key={answer} className="answer">
            <button
              className={answer === selectedAnswer?.text ? (selectedAnswer.correct ? 'correct' : 'wrong') : null}
              onClick={() => handleSelectAnswer(answer)}
              disabled={hasSelectedAnswer}
            >
              <span className="letter">{getAnswerLetter(index)}</span>
              <span className="text">{answer}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

/**
 * Shuffle an array using Durstenfeld algorithm.
 * @see https://stackoverflow.com/a/12646864/6316545.
 */
function shuffle(array) {
  array = structuredClone(array);
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getAnswerLetter(answerIndex, letters = ['A', 'B', 'C', 'D']) {
  return letters[answerIndex];
}

function isCorrectAnswer(answer, allAnswers) {
  return answer === allAnswers[0];
}
