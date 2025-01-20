import { useState } from 'react';

import { Counter } from './components/Counter.jsx';
import { CounterConfig } from './components/CounterConfig.jsx';
import { Header } from './components/Header.jsx';
import { log } from './lib/log.js';

export default function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  // See CounterHistory.jsx for an explanation of React 'keys'.

  return (
    <>
      <Header />
      <main>
        <CounterConfig onChange={setChosenCount} />
        {/* Note: We can use the 'key' prop to force React to destroy and recreate a component. */}
        {/* React will recreate the component when the current key does not match the previous key. */}
        {/* The key value here ensures that the initial counter value is updated when the chosenCount changes. */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}
