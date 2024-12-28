import { createGrid } from '../lib/gameTurns';

export function GameBoard({ gameTurns = [], onSelectSquare = () => null, isGameOver = false }) {
  const grid = createGrid(gameTurns);
  return (
    <ol id="game-board">
      {grid.map((row, rowNum) => (
        <ol key={rowNum}>
          {row.map((symbol, colNum) => (
            <li key={colNum}>
              <button onClick={() => onSelectSquare(rowNum, colNum)} disabled={symbol !== null || isGameOver}>
                {symbol}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}
