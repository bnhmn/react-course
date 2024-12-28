import { useState } from 'react';
import { addGameTurn, computeActiveSymbol, computeIsGameOver } from '../lib/gameTurns';
import { GameBoard } from './GameBoard';
import { GameLog } from './GameLog';
import { GameOver } from './GameOver';
import { Player } from './Player';

export function Game() {
  // This is an example of sharing state between components aka lifting state up.
  // You often need to lift state up to the closest ancestor component that has
  // access to all components that need to work with that state.
  // See https://react.dev/learn/sharing-state-between-components.

  const [gameTurns, setGameTurns] = useState([]);
  const activeSymbol = computeActiveSymbol(gameTurns);
  const { isGameOver, winner } = computeIsGameOver(gameTurns);

  const handleSelectSquare = (rowNum, colNum) => {
    setGameTurns((oldTurns) => addGameTurn(oldTurns, rowNum, colNum));
  };
  const handleRematch = () => setGameTurns([]);

  return (
    <>
      <main id="game-container">
        <ol id="players">
          <Player symbol="X" defaultName="Player 1" isActive={activeSymbol === 'X'} />
          <Player symbol="O" defaultName="Player 2" isActive={activeSymbol === 'O'} />
        </ol>
        {isGameOver && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard gameTurns={gameTurns} onSelectSquare={handleSelectSquare} isGameOver={isGameOver} />
      </main>
      <GameLog gameTurns={gameTurns} />
    </>
  );
}
