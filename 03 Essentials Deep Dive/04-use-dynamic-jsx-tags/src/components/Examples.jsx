import { EXAMPLES } from '../data';
import './Examples.css';
import { Section } from './Section';
import { TabMenu } from './TabMenu';

export function Examples() {
  return (
    <Section id="examples" title="Examples">
      <TabMenu
        // You can dynamically assign a component type/tag via a prop
        // ButtonsContainer="menu"
        // ButtonsContainer="div"
        ButtonsContainer={Section}
        buttons={EXAMPLES.getNames()}
        content={(selectedButton) => (
          <>
            <h3>{EXAMPLES.get(selectedButton).title}</h3>
            <p>{EXAMPLES.get(selectedButton).description}</p>
            <pre>
              <code>{EXAMPLES.get(selectedButton).code}</code>
            </pre>
          </>
        )}
      />
    </Section>
  );
}
