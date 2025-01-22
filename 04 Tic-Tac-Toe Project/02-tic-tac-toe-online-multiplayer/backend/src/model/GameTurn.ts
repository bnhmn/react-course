import { GameTurnResponse } from '../api/response/GameResponse';

export class GameTurn {
  constructor(public symbol: string, public rowNum: number, public colNum: number) {}

  toResponse(): GameTurnResponse {
    return {
      symbol: this.symbol,
      rowNum: this.rowNum,
      colNum: this.colNum,
    };
  }
}

export function findWinner(
  gameTurns: GameTurn[],
  gridSize: number,
): { isGameOver: boolean; winnerSymbol: string | null } {
  const grid = createGrid(gameTurns, gridSize);
  const winnerSymbol =
    findRowMatch(grid, gridSize) || findColumnMatch(grid, gridSize) || findDiagonalMatch(grid, gridSize);
  const isGameOver = winnerSymbol !== null || gameTurns.length >= gridSize ** 2;
  return { isGameOver, winnerSymbol };
}

function createGrid(gameTurns: GameTurn[], gridSize: number, defaultContent = null): string[][] {
  const grid = new Array(gridSize);
  for (let row = 0; row < gridSize; row++) {
    grid[row] = Array(gridSize).fill(defaultContent);
  }
  for (const { rowNum, colNum, symbol } of gameTurns) {
    grid[rowNum][colNum] = symbol;
  }
  return grid;
}

function findRowMatch(grid: string[][], gridSize: number) {
  for (let row = 0; row < gridSize; row++) {
    const rowSymbols = grid[row];
    const rowSymbol = rowSymbols[0];
    if (rowSymbol && rowSymbols.every((symbol) => symbol === rowSymbol)) {
      return rowSymbol;
    }
  }
  return null;
}

function findColumnMatch(grid: string[][], gridSize: number) {
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

function findDiagonalMatch(grid: string[][], gridSize: number) {
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
