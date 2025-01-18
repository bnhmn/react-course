import { useState } from 'react';
import { QUESTIONS } from '../data/questions';

export function Quiz({ questions = QUESTIONS }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const activeQuestionIndex = selectedAnswers.length;
  const activeQuestion = questions[activeQuestionIndex];
  const activeQuestionAnswers = shuffle(activeQuestion.answers);

  const handleSelectAnswer = (answer) => setSelectedAnswers((answers) => [...answers, answer]);

  return (
    <div id="quiz">
      <h2>{activeQuestion.text}</h2>
      <ol id="answers">
        {activeQuestionAnswers.map((answer, index) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>
              <span className="letter">{getAnswerLetter(index)}</span>
              <span className="text">{answer}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
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
