import reactImage from './assets/react-core-concepts.png';

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
      <h2>Time to get started!</h2>
    </main>
  );
}

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
