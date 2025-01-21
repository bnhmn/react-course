import { EXAMPLES } from '../data';
import './Examples.css';
import { Section } from './Section';
import { TabMenu } from './TabMenu';

// React Slots
// -----------
// Slots are a way to pass JSX elements to a component and let them render in a specific location,
// like a header or footer.
//
// The default slot in React is known as 'children' property. Whatever you pass between the opening
// and closing tag of a component is passed as children property to that component.
//
// You can define additional named slots using normal properties like 'buttons' or 'content',
// and pass JSX elements to that slot, similar to children.
// See https://www.dhiwise.com/post/mastering-react-slot-patterns-for-flexible-ui-components.
//
export function Examples() {
  return (
    <Section id="examples" title="Examples">
      <TabMenu
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
