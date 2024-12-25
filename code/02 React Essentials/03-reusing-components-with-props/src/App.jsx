import reactImage from './assets/react-core-concepts.png';
import { CORE_CONCEPTS } from './data';

const descriptions = ['Fundamental', 'Crucial', 'Core'];

export default function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  const description = randomChoice(descriptions);
  return (
    <header>
      <img src={reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>{description} React concepts you will need for almost any app you are going to build!</p>
    </header>
  );
}

function Main() {
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

// React components accept a single object parameter (props). Its properties can be extracted using object destructuring
function Tile({ image, title, description }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
