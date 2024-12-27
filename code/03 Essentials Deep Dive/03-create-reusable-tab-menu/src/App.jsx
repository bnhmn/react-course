import './App.css';
import { Concepts } from './components/Concepts';
import { Examples } from './components/Examples';
import { Header } from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Concepts />
        <Examples />
      </main>
    </div>
  );
}
