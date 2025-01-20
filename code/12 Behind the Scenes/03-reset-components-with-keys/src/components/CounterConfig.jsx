import { useState } from 'react';
import { log } from '../lib/log.js';

export function CounterConfig({ onChange }) {
  log('<CounterConfig /> rendered', 1);

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(event.target.value);

    // Remember: State updates are not performed immediately, but are scheduled to run in a subsequent render cycle.
    // Note: You cannot directly use the updated state value after setting it to a new value.
    // This log statement will not log the new enteredNumber but the previous one!

    console.log(enteredNumber);

    // That's also the reason that you should use the setEnteredNumber(prev => prev + 1) variant if your new state
    // depends on the old state value (not the case here though).
    // This is especially import when your state setter function is executed multiple times in a render cycle.
    //
    // If you want to increment the enteredNumber by two, use this
    //
    // setEnteredNumber((prev) => prev + 1);
    // setEnteredNumber((prev) => prev + 1);
    //
    // instead of this (will not work)
    //
    // setEnteredNumber(enteredNumber + 1);
    // setEnteredNumber(enteredNumber + 1);
  }

  function handleSetClick() {
    onChange(parseInt(enteredNumber));
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
