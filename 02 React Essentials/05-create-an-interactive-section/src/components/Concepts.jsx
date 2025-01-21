import { CORE_CONCEPTS } from '../data';
import './Concepts.css';
import { Tile } from './Tile';

export function Concepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        <Tile {...CORE_CONCEPTS[0]} />
        <Tile {...CORE_CONCEPTS[1]} />
        <Tile {...CORE_CONCEPTS[2]} />
        <Tile {...CORE_CONCEPTS[3]} />
      </ul>
    </section>
  );
}
