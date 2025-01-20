import { useState } from 'react';

import { memo } from 'react';
import { log } from '../lib/log.js';
import { CounterOutput } from './CounterOutput.jsx';
import { IconButton } from './IconButton.jsx';
import { IconMinus } from './IconMinus.jsx';
import { IconPlus } from './IconPlus.jsx';

// Normally, React will always re-execute the Counter component whenever its parent component is re-rendered.
// We can wrap it with 'memo' to avoid the automatic re-execution. memo will compare old and new prop values
// and will skip the execution of the component if the 'initialCount' did not change.
//
// Note: We should not overuse memo! Applying memo to all components would be eager optimization.
// Only use it when really necessary and when you can proof that it really improves the performance.
// It is just applied here for demonstration purposes. In reality, it's not required for such small projects.

export const Counter = memo(({ initialCount }) => {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = isPrime(initialCount);

  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={IconMinus} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={IconPlus} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
