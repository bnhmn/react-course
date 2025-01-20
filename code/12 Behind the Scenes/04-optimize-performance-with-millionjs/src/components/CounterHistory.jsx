import { useState } from 'react';

import { log } from '../lib/log.js';

export function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return <ol>{history.map((count, index) => <HistoryItem key={index} count={count} />).reverse()}</ol>;
}

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  const handleClick = () => setSelected((prevSelected) => !prevSelected);

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}
