import { useState } from 'react';

import { log } from '../lib/log.js';

export function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  // When rendering arrays, it's important to assign a valid 'key' to each item. The key acts as an identifier
  // for the DOM element and should not change when items are added or removed from the array.
  // React needs this identifier to compute the transition between the current and the target DOM state.
  // Normally, it's best to use a business key (e.g. an id or a unique title).
  // You can only use the index as a key when you can ensure that the list is append only (no shifts or removes).
  //
  // If the 'HistoryItem' key below was not stable (e.g. if you reverse the history before assigning the key),
  // and you select a history item, then increment the counter, the selected history item would magically switch.
  //
  // return <ol>{history.reverse().map((count, index) => <HistoryItem key={index} count={count} />)}</ol>;

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
