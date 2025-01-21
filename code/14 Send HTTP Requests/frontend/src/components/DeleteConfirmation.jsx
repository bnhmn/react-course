import { useEffect } from 'react';

import { ProgressBar } from './ProgressBar.jsx';

export function DeleteConfirmation({ onConfirm, onCancel, autoConfirmSeconds = 3 }) {
  useEffect(() => {
    const timer = setTimeout(onConfirm, autoConfirmSeconds * 1000);
    return () => clearTimeout(timer);
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timeSeconds={autoConfirmSeconds} />
    </div>
  );
}
