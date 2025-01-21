import { useState } from 'react';

import { memo, useMemo } from 'react';
import { log } from '../lib/log.js';
import { CounterOutput } from './CounterOutput.jsx';
import { IconButton } from './IconButton.jsx';
import { IconMinus } from './IconMinus.jsx';
import { IconPlus } from './IconPlus.jsx';

// Normally, React will always re-execute the Counter component whenever its parent component is re-rendered.
// We can wrap a component with 'memo' to avoid the automatic re-execution. memo will compare old and new prop
// values and will skip the execution of the component if the 'initialCount' did not change.
// https://react.dev/reference/react/memo
//
// Note: We should not overuse memo! Applying memo to all components would be eager optimization.
// Only use it when really necessary and when you can proof that it really improves the performance.
// It is just applied here for demonstration purposes. In reality, it's not required for such small projects.
//
// Regardless of component executions, React will always check for necessary DOM updates via its 'Virtual DOM'.
// If a component has been re-executed but the returned JSX code has not changed,
// React will *not* update the Browser's DOM: https://legacy.reactjs.org/docs/faq-internals.html.

export const Counter = memo(({ initialCount }) => {
  log('<Counter /> rendered', 1);

  // The 'useMemo' hook (a different thing than 'memo') can be used to cache values between re-renders that are
  // expensive to calculate. It will only re-execute isPrime(initialCount) here if the initialCount has changed.
  // In other words, useMemo caches a calculation result between re-renders until its dependencies change.
  // https://react.dev/reference/react/useMemo#skipping-expensive-recalculations
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

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
