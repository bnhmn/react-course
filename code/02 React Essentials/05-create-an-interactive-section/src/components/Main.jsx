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
          <Tile {...CORE_CONCEPTS[0]} />
          <Tile {...CORE_CONCEPTS[1]} />
          <Tile {...CORE_CONCEPTS[2]} />
          <Tile {...CORE_CONCEPTS[3]} />
        </ul>
      </section>
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
    </main>
  );
}
