import { useState } from 'react';

export function Preferences({ onJoinGame = ({ name, gridSize }) => null }) {
  const [name, setName] = useState(randomPlayerName());
  const [gridSize, setGridSize] = useState(3);
  return (
    <main id="game-container">
      <label htmlFor="name">Name:</label>
      <input
        className="player-name"
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="grid-size-3">3x3</label>
      <input type="radio" id="grid-size-3" name="grid-size" onClick={() => setGridSize(3)} defaultChecked />
      <label htmlFor="grid-size-4">4x4</label>
      <input type="radio" id="grid-size-4" name="grid-size" onClick={() => setGridSize(4)} />
      <button onClick={() => onJoinGame({ name, gridSize })}>Join Game</button>
    </main>
  );
}

function randomPlayerName() {
  return 'Player ' + (Math.floor(Math.random() * 900) + 100);
}
