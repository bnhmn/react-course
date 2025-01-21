import { useState } from 'react';
import { EXAMPLES } from '../data';
import './Examples.css';
import { TabButton } from './TabButton';

export function Examples() {
  const [selected, setSelected] = useState();
  const selectedExample = EXAMPLES[selected];

  return (
    <section id="examples">
      <h2>Examples</h2>
      <menu>
        {
          // In JSX, you can output arrays like this: [<p>Hello</p>, <p>World!</p>].
          // EXAMPLES is an array too. You can use map() to transform arrays into JSX elements.

          Object.entries(EXAMPLES).map(([key, example]) => (
            <TabButton key={key} isActive={selected === key} onClick={() => setSelected(key)}>
              {example.title}
            </TabButton>
          ))

          // When outputting arrays, each array item should have a unique key property.
          // Without the key property, React will print a warning to the console.
        }
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
  );
}
