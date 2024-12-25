import { CORE_CONCEPTS } from '../data';
import './Main.css';
import { Tile } from './Tile';

export function Main() {
  return (
    <main>
      <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((concept) => (
            <Tile title={concept.title} description={concept.description} image={concept.image} />
            // <Tile {...concept} /> - does the same thing
          ))}
        </ul>
      </section>
    </main>
  );
}
