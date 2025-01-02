import { Button, Grid } from '@chakra-ui/react';

import { GameTurnType } from '../types/GameTurn';

interface GameBoardProps {
  gameTurns: GameTurnType[];
  gridSize: number;
  onSelectSquare: (rowNum: number, colNum: number) => void;
  isActive?: boolean;
}

export function GameBoard({ gameTurns, gridSize, onSelectSquare, isActive = true }: GameBoardProps) {
  return (
    <Grid id="game-board" templateColumns={`repeat(${gridSize}, 8rem)`} gap={6}>
      {createGrid(gameTurns, gridSize).map((row, rowNum) =>
        row.map((symbol, colNum) => (
          <Button
            key={'' + rowNum + colNum}
            onClick={() => onSelectSquare(rowNum, colNum)}
            disabled={symbol !== null || !isActive}
          >
            {symbol}
          </Button>
        )),
      )}
    </Grid>
  );
}

function createGrid(gameTurns: GameTurnType[], gridSize: number, defaultContent = null): number[][] {
  const grid = new Array(gridSize);
  for (let row = 0; row < gridSize; row++) {
    grid[row] = Array(gridSize).fill(defaultContent);
  }
  for (const { rowNum, colNum, symbol } of gameTurns) {
    grid[rowNum][colNum] = symbol;
  }
  return grid;
}
