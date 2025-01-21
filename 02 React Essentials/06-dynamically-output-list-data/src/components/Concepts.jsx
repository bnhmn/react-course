import { CORE_CONCEPTS } from '../data';
import './Concepts.css';
import { Tile } from './Tile';

export function Concepts() {
  return (
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
  );
}
