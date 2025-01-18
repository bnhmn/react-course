import quizLogo from '../assets/quiz-logo.png';

export function Header() {
  return (
    <header>
      <img src={quizLogo} alt="A text board with unfilled questions" />
      <h1>React Quiz</h1>
    </header>
  );
}
