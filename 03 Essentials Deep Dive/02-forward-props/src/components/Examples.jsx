import { useState } from 'react';
import { EXAMPLES } from '../data';
import './Examples.css';
import { Section } from './Section';
import { TabButton } from './TabButton';

export function Examples() {
  const [selected, setSelected] = useState();
  const selectedExample = EXAMPLES[selected];

  return (
    <Section id="examples" title="Examples">
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
    </Section>
  );
}
