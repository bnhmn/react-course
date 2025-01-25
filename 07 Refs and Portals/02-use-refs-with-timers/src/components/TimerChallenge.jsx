import { useRef, useState } from 'react';

export function TimerChallenge({ title, targetSeconds }) {
  const [state, setState] = useState('inactive');

  // A ref is used to store stateful values that do not cause rerendering when changed.
  // We don't need to update the UI when the timer is assigned, so we should use a ref instead of a state here
  const timer = useRef();

  const handleClick = () => {
    if (state !== 'running') {
      setState('running');
      timer.current = setTimeout(() => setState('expired'), targetSeconds * 1000);
    } else {
      setState('inactive');
      clearTimeout(timer.current);
    }
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">{formatSeconds(targetSeconds)}</p>
      <p>
        <button onClick={handleClick}>
          {state !== 'running' && 'Start Challenge'}
          {state === 'running' && 'Stop Challenge'}
        </button>
      </p>
      <p className={state === 'running' ? 'active' : undefined}>
        {state === 'inactive' && 'Timer inactive'}
        {state === 'running' && 'Time is running...'}
        {state === 'expired' && ' You lost!'}
      </p>
    </section>
  );
}

function formatSeconds(seconds) {
  return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
}
