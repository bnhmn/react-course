import { useImperativeHandle, useRef } from 'react';

export function ResultModal({ ref, targetSeconds, remainingSeconds }) {
  const dialog = useRef();
  const won = remainingSeconds > 0;
  const score = won ? Math.round((1 - remainingSeconds / targetSeconds) * 100) : 0;

  // We can accept a ref like a regular prop and pass it down to the dialog element.
  // The caller can then call ref.current.showModal() to make the modal visible.

  // However, to avoid the exposure of implementation details, we can instead expose custom
  // methods on this ref with the help of the useImperativeHandle hook.
  // This way, we can replace the dialog with another html element without breaking the ref's behaviour.

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {won ? 'won' : 'lost'}</h2>
      <p>
        Your score is <strong>{score}</strong>.
      </p>
      <p>
        The target time was <strong>{formatSeconds(targetSeconds)}.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formatSeconds(remainingSeconds)} left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

function formatSeconds(seconds) {
  return seconds === '1' ? `${seconds} second` : `${seconds} seconds`;
}
