export function createGrid(gameTurns, gridSize = 3, defaultContent = null) {
  const grid = new Array(gridSize);
  for (let row = 0; row < gridSize; row++) {
    grid[row] = Array(gridSize).fill(defaultContent);
  }
  for (const { rowNum, colNum, symbol } of gameTurns) {
    grid[rowNum][colNum] = symbol;
  }
  return grid;
}

export function addGameTurn(gameTurns, symbols, rowNum, colNum) {
  // It is strongly recommended to use immutable state values.
  // When you are trying to mutate reference state values (objects and arrays),
  // it may cause bugs or side effects and React may not even apply these changes to the UI.
  //
  // Instead of updating the 'gameTurns' array, we create a new copy with updated content.
  // See https://react.dev/learn/updating-objects-in-state.
  //
  const activeSymbol = computeActiveSymbol(gameTurns, symbols);
  const newGameTurns = structuredClone(gameTurns);
  newGameTurns.push({ rowNum, colNum, symbol: activeSymbol });
  return newGameTurns;
}

export function computeActiveSymbol(gameTurns, symbols = ['X', 'O']) {
  const lastSymbol = gameTurns.at(-1)?.symbol ?? symbols.at(-1);
  const currSymbolIndex = (symbols.indexOf(lastSymbol) + 1) % symbols.length;
  const currSymbol = symbols[currSymbolIndex];
  return currSymbol;
}

export function computeIsGameOver(gameTurns, gridSize = 3) {
  const grid = createGrid(gameTurns, gridSize);
  const winner = findRowMatch(grid, gridSize) || findColumnMatch(grid, gridSize) || findDiagonalMatch(grid, gridSize);
  const isGameOver = winner || gameTurns.length >= gridSize ** 2;
  return { isGameOver, winner };
}

function findRowMatch(grid, gridSize) {
  for (let row = 0; row < gridSize; row++) {
    const rowSymbols = grid[row];
    const rowSymbol = rowSymbols[0];
    if (rowSymbol && rowSymbols.every((symbol) => symbol === rowSymbol)) {
      return rowSymbol;
    }
  }
  return null;
}

function findColumnMatch(grid, gridSize) {
  for (let col = 0; col < gridSize; col++) {
    const colSymbols = [];
    for (let row = 0; row < gridSize; row++) {
      colSymbols.push(grid[row][col]);
    }
    const colSymbol = colSymbols[0];
    if (colSymbol && colSymbols.every((symbol) => symbol === colSymbol)) {
      return colSymbol;
    }
  }
  return null;
}

function findDiagonalMatch(grid, gridSize) {
  const mainDiagSymbols = [];
  const antiDiagSymbols = [];
  for (let i = 0; i < gridSize; i++) {
    mainDiagSymbols.push(grid[i][i]);
    antiDiagSymbols.push(grid[i][gridSize - i - 1]);
  }

  const mainDiagSymbol = mainDiagSymbols[0];
  const antiDiagSymbol = antiDiagSymbols[0];
  if (mainDiagSymbol && mainDiagSymbols.every((symbol) => symbol === mainDiagSymbol)) {
    return mainDiagSymbol;
  }
  if (antiDiagSymbol && antiDiagSymbols.every((symbol) => symbol === antiDiagSymbol)) {
    return antiDiagSymbol;
  }
  return null;
}
