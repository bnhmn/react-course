import { useRef, useState } from 'react';
import { QuestionTimer } from './QuestionTimer';

export function Question({ question, answers, onSelectAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const hasSelectedAnswer = selectedAnswer !== null;
  // Store shuffled answers in a ref to prevent them from being reshuffled when the user selects an answer.
  const shuffledAnswers = useRef(shuffle(answers));

  const handleSelectAnswer = (answer) => {
    if (answer !== null) {
      // Display whether the selected answer was correct or not before submitting it to the caller.
      setSelectedAnswer(answer);
      setTimeout(() => onSelectAnswer(answer), 2500);
    } else {
      onSelectAnswer(null);
    }
  };

  return (
    <>
      <div id="question">
        <QuestionTimer active={!hasSelectedAnswer} timeoutSeconds={15} onTimeout={() => handleSelectAnswer(null)} />
        <h2>{question}</h2>
      </div>
      <ol id="answers">
        {shuffledAnswers.current.map((answer, index) => (
          <li key={answer} className="answer">
            <button
              className={getButtonClass(answer, selectedAnswer, answers)}
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

function getButtonClass(answer, selectedAnswer, allAnswers) {
  if (answer === selectedAnswer) {
    const isCorrectAnswer = selectedAnswer === allAnswers[0];
    return isCorrectAnswer ? 'correct' : 'wrong';
  }
  return null;
}
