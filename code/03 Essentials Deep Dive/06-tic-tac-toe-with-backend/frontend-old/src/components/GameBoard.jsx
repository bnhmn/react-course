export function GameBoard({ gameTurns = [], gridSize = 3, onSelectSquare = () => null, isActive = true }) {
  const grid = createGrid(gameTurns, gridSize);
  return (
    <ol id="game-board">
      {grid.map((row, rowNum) => (
        <ol key={rowNum}>
          {row.map((symbol, colNum) => (
            <li key={colNum}>
              <button onClick={() => onSelectSquare(rowNum, colNum)} disabled={symbol !== null || !isActive}>
                {symbol}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}

function createGrid(gameTurns, gridSize, defaultContent = null) {
  const grid = new Array(gridSize);
  for (let row = 0; row < gridSize; row++) {
    grid[row] = Array(gridSize).fill(defaultContent);
  }
  for (const { rowNum, colNum, symbol } of gameTurns) {
    grid[rowNum][colNum] = symbol;
  }
  return grid;
}
