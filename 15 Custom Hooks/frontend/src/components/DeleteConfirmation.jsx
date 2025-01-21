import { useEffect, useState } from 'react';

export function DeleteConfirmation({ onConfirm, onCancel, autoConfirmSeconds = 3 }) {
  const [remainingSeconds, setRemainingSeconds] = useState(autoConfirmSeconds);

  useEffect(() => {
    const timer = setInterval(() => setRemainingSeconds((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(onConfirm, autoConfirmSeconds * 1000);
    return () => clearTimeout(timer);
  }, [onConfirm, autoConfirmSeconds]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes ({remainingSeconds})
        </button>
      </div>
    </div>
  );
}
