import { useState } from 'react';
import { QUESTIONS } from '../data/questions';

export function Quiz({ questions = QUESTIONS }) {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const activeQuestion = questions[activeQuestionIndex];

  const handleSelectAnswer = (answer) => setAnswers((answers) => [...answers, answer]);

  return (
    <div id="quiz">
      <h2>{activeQuestion.text}</h2>
      <ol id="answers">
        {activeQuestion.answers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
