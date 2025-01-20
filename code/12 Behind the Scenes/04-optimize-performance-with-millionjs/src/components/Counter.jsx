import { useState } from 'react';

import { useMemo } from 'react';
import { log } from '../lib/log.js';
import { CounterHistory } from './CounterHistory.jsx';
import { CounterOutput } from './CounterOutput.jsx';
import { IconButton } from './IconButton.jsx';
import { IconMinus } from './IconMinus.jsx';
import { IconPlus } from './IconPlus.jsx';

export function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // We don't just track the current counter value but the full history of counter changes
  const [counterHistory, setCounterHistory] = useState([initialCount]);
  const counter = counterHistory.at(-1);

  const handleIncrement = () => setCounterHistory((prev) => [...prev, prev.at(-1) + 1]);
  const handleDecrement = () => setCounterHistory((prev) => [...prev, prev.at(-1) - 1]);

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
      <CounterHistory history={counterHistory} />
    </section>
  );
}

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
