import { useState } from 'react';
import { addGameTurn, computeActiveSymbol, computeIsGameOver } from '../lib/gameTurns';
import { GameBoard } from './GameBoard';
import { GameLog } from './GameLog';
import { GameOver } from './GameOver';
import { Players } from './Players';

export function Game() {
  // This is an example of sharing state between components aka lifting state up.
  // You often need to lift state up to the closest ancestor component that has
  // access to all components that need to work with that state.
  // See https://react.dev/learn/sharing-state-between-components.

  const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
  const [gameTurns, setGameTurns] = useState([]);
  const symbols = Object.keys(players);
  const activeSymbol = computeActiveSymbol(gameTurns, symbols);
  const { isGameOver, winner } = computeIsGameOver(gameTurns);

  const handleSelectSquare = (rowNum, colNum) => {
    setGameTurns((oldTurns) => addGameTurn(oldTurns, symbols, rowNum, colNum));
  };
  const handleRematch = () => setGameTurns([]);

  return (
    <>
      <main id="game-container">
        <Players players={players} activeSymbol={activeSymbol} onChange={setPlayers} />
        <GameBoard gameTurns={gameTurns} onSelectSquare={handleSelectSquare} isGameOver={isGameOver} />
        {isGameOver && <GameOver winner={players[winner]} onRematch={handleRematch} />}
      </main>
      <GameLog gameTurns={gameTurns} />
    </>
  );
}
