import { useState } from 'react';

import { Counter } from './components/Counter.jsx';
import { CounterConfig } from './components/CounterConfig.jsx';
import { Header } from './components/Header.jsx';
import { log } from './lib/log.js';

export default function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  // You can optimize React projects with the help of million-js: "Speed up your website by 70%"
  // Install it by running 'npx million@latest': https://million.dev/docs
  // This should automatically make our app faster without doing anything else (automatic mode).

  // Million improves the performance by replacing React's Virtual Dom with a more efficient mechanism:
  // https://old.million.dev/blog/virtual-dom
  // Because this is a very small project, we will not notice it here, though.

  return (
    <>
      <Header />
      <main>
        <CounterConfig onChange={setChosenCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}
