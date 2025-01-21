import { useEffect, useState } from 'react';

export function DeleteConfirmation({ onConfirm, onCancel, autoConfirmSeconds = 3 }) {
  const [remainingSeconds, setRemainingSeconds] = useState(autoConfirmSeconds);

  // We can use useEffect to create a timer that decreases a counter by 1 every second.
  // In order to stop the timer when the user cancels the dialog, we return a cleanup function inside useEffect.
  // React will execute the cleanup function when the component is removed from the DOM.
  // Note: If the effect had dependencies, the cleanup would also be executed every time before the effect reruns.

  useEffect(() => {
    const timer = setInterval(() => setRemainingSeconds((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // We need to wrap the 'onConfirm' call with useEffect because else we would get this error:
  // "Cannot update a component 'App' while rendering a different component 'DeleteConfirmation'"
  //
  // We need to add 'onConfirm' as a dependency and make sure it is wrapped with 'useCallback' on the caller side.
  // https://react.dev/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency

  useEffect(() => {
    if (remainingSeconds === 0) {
      onConfirm();
    }
  }, [onConfirm, remainingSeconds]);

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
