import { useState } from 'react';
import quizComplete from '../assets/quiz-complete.png';
import { QUESTIONS } from '../data/questions';
import { Question } from './Question';

export function Quiz({ questions = QUESTIONS }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const activeQuestionIndex = selectedAnswers.length;
  const activeQuestion = questions[activeQuestionIndex];

  return (
    <>
      {activeQuestion && (
        <div id="quiz">
          {/* The 'key' value ensures that the question timer is restarted with each question */}
          {/* Note: We can use the key prop to force React to destroy and recreate a component */}
          <Question
            key={activeQuestionIndex}
            question={activeQuestion.text}
            answers={activeQuestion.answers}
            onSelectAnswer={(answer) => setSelectedAnswers((answers) => [...answers, answer])}
          />
        </div>
      )}
      {!activeQuestion && (
        <div id="summary">
          <img src={quizComplete} alt="Trophy icon" />
          <h2>Quiz Completed!</h2>
        </div>
      )}
    </>
  );
}
