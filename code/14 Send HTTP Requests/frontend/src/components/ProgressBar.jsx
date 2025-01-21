import { useEffect, useState } from 'react';

export function ProgressBar({ timeSeconds }) {
  const timeMs = timeSeconds * 1000;
  const [remainingTimeMs, setRemainingTimeMs] = useState(timeMs);

  useEffect(() => {
    const interval = setInterval(() => setRemainingTimeMs((prevTime) => prevTime - 10), 10);
    return () => clearInterval(interval);
  }, []);

  return <progress value={remainingTimeMs} max={timeMs} />;
}
