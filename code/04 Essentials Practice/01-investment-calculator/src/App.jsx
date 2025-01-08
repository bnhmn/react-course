import { useState } from 'react';
import { Header } from './components/Header';
import { UserInput } from './components/Input';
import { Result } from './components/Result';

export default function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10_000,
    annualInvestment: 1_200,
    expectedReturn: 6,
    duration: 10,
  });
  const isValid = Object.values(userInput).every((value) => value >= 0);

  return (
    <>
      <Header />
      <UserInput input={userInput} onChange={setUserInput} />
      {isValid && <Result input={userInput} />}
      {!isValid && <p className="center">Please enter positive numbers!</p>}
    </>
  );
}
