import { useState } from 'react';
import { EXAMPLES } from '../data';
import './Examples.css';
import { TabButton } from './TabButton';

export function Examples() {
  // With the useState() hook, you can access and update stateful values.
  // Whenever a state value is changed via its setter function, React will re-execute and rerender the component.

  const [selected, setSelected] = useState();
  const selectedExample = EXAMPLES[selected];

  return (
    <section id="examples">
      <h2>Examples</h2>
      <menu>
        <TabButton isActive={selected == 'components'} onClick={() => setSelected('components')}>
          Components
        </TabButton>
        <TabButton isActive={selected == 'jsx'} onClick={() => setSelected('jsx')}>
          JSX
        </TabButton>
        <TabButton isActive={selected == 'props'} onClick={() => setSelected('props')}>
          Props
        </TabButton>
        <TabButton isActive={selected == 'state'} onClick={() => setSelected('state')}>
          State
        </TabButton>
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
