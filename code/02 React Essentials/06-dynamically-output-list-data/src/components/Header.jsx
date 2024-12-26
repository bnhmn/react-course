import reactImage from '../assets/react-core-concepts.png';
import './Header.css';

const descriptions = ['Fundamental', 'Crucial', 'Core'];

export function Header() {
  const description = randomChoice(descriptions);
  return (
    <header>
      <img src={reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>{description} React concepts you will need for almost any app you are going to build!</p>
    </header>
  );
}

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
