import { useState } from 'react';

import { Counter } from './components/Counter.jsx';
import { Header } from './components/Header.jsx';
import { log } from './lib/log.js';

export default function App() {
  log('<App /> rendered');

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  // Whenever the user changes the 'enteredNumber', React will re-render the App component and all its child components.
  // We can avoid the re-execution of the Counter component by applying 'memo' to it (see Counter.jsx).
  // However, a better way would be to move the state out of the App component and extract it into a separate component.

  return (
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}
