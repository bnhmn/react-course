import { CORE_CONCEPTS } from '../data';
import './Concepts.css';
import { Section } from './Section';
import { Tile } from './Tile';

export function Concepts() {
  return (
    <Section id="core-concepts" title="Core Concepts">
      <ul>
        {CORE_CONCEPTS.map((concept) => (
          <Tile key={concept.title} {...concept} />
        ))}
      </ul>
    </Section>
  );
}
