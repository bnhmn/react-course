import { useRef, useState } from 'react';
import { ResultModal } from './ResultModal';

export function TimerChallenge({ title, targetSeconds }) {
  const [state, setState] = useState('inactive');

  // A ref is used to store stateful values that do not cause rerendering when changed.
  const startDate = useRef();
  const timer = useRef();
  const modal = useRef();
  const remainingSeconds = computeRemainingSeconds(startDate.current, targetSeconds);

  const start = () => {
    setState('running');
    startDate.current = new Date();
    timer.current = setTimeout(() => finish('expired'), targetSeconds * 1000);
  };
  const stop = () => {
    finish('inactive');
    clearTimeout(timer.current);
  };
  const finish = (newState) => {
    setState(newState);
    modal.current.open();
  };

  return (
    <>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">{formatSeconds(targetSeconds)}</p>
        <p>
          <button onClick={() => (state === 'running' ? stop() : start())}>
            {state === 'running' ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={state === 'running' ? 'active' : undefined}>
          {state === 'inactive' && 'Timer inactive'}
          {state === 'running' && 'Time is running...'}
          {state === 'expired' && 'You lost!'}
        </p>
      </section>
      <ResultModal ref={modal} targetSeconds={targetSeconds} remainingSeconds={remainingSeconds} />
    </>
  );
}

function formatSeconds(seconds) {
  return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
}

function computeRemainingSeconds(startDate, targetSeconds) {
  const elapsedSeconds = startDate ? (new Date().valueOf() - startDate.valueOf()) / 1000 : 0;
  const delta = targetSeconds - elapsedSeconds;
  const roundedDelta = Math.round(delta * 100) / 100;
  return Math.max(roundedDelta, 0);
}
