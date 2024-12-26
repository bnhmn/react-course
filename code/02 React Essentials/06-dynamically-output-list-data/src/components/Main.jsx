import { useState } from 'react';
import { CORE_CONCEPTS, EXAMPLES } from '../data';
import './Main.css';
import { TabButton } from './TabButton';
import { Tile } from './Tile';

export function Main() {
  const [selected, setSelected] = useState();
  const selectedExample = EXAMPLES[selected];
  return (
    <main>
      <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {
            // In JSX, you can output arrays like this: [<p>Hello</p>, <p>World!</p>].
            // CORE_CONCEPTS is an array too. You can use map() to transform arrays into JSX elements.

            CORE_CONCEPTS.map((concept) => (
              <Tile key={concept.title} {...concept} />
            ))

            // When outputting arrays, each array item should have a unique key property.
            // Without the key property, React will print a warning to the console.
          }
        </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
          {Object.entries(EXAMPLES).map(([key, example]) => (
            <TabButton key={key} isActive={selected === key} onClick={() => setSelected(key)}>
              {example.title}
            </TabButton>
          ))}
        </menu>
        {/* There are other ways to do this. See https://react.dev/learn/conditional-rendering */}
        {!selected && <p>Please select a topic.</p>}
        {selected && (
          <div id="tab-content">
            <h3>{selectedExample.title}</h3>
            <p>{selectedExample.description}</p>
            <pre>
              <code>{selectedExample.code}</code>
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
