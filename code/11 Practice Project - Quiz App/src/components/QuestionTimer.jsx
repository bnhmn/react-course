import { useEffect, useState } from 'react';

export function QuestionTimer({ active = true, timeoutSeconds = 15, updateIntervalMs = 30, onTimeout = () => null }) {
  const timeoutMs = timeoutSeconds * 1000;
  const [remainingMs, setRemainingMs] = useState(timeoutMs);

  // An effect that periodically updates the progress bar value.
  // We specify 'active' and 'updateIntervalMs' as dependencies so that the effect is restarted if their values change.
  // We don't need to add 'setRemainingMs' as a dependency here because React state setters are constant.

  useEffect(() => {
    if (active) {
      const timer = setInterval(
        () => setRemainingMs((remainingMs) => remainingMs - updateIntervalMs),
        updateIntervalMs,
      );
      return () => clearInterval(timer);
    }
  }, [active, updateIntervalMs]);

  // An effect that ends the timer when the timeout is reached.
  // Normally we should specify 'onTimeout' and 'timeoutMs' as dependencies here and make sure 'onTimeout'
  // is wrapped with 'useCallback' on the caller side, but because we know that these two values ​​will not
  // change during the lifetime of the timer, I leave it out for simplicity.

  useEffect(() => {
    if (active) {
      const timer = setTimeout(onTimeout, timeoutMs);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return <progress value={remainingMs} max={timeoutMs} />;
}
