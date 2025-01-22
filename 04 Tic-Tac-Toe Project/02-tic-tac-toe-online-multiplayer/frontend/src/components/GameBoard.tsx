import { Button, Grid } from '@chakra-ui/react';

import { GameTurnType } from '../backend/types/GameTurn';

interface GameBoardProps {
  gameTurns: GameTurnType[];
  gridSize: number;
  onSelectSquare: (rowNum: number, colNum: number) => void;
  isActive?: boolean;
}

export function GameBoard({ gameTurns, gridSize, onSelectSquare, isActive = true }: GameBoardProps) {
  return (
    // For base,md see https://v2.chakra-ui.com/docs/styled-system/responsive-styles#the-object-syntax
    <Grid
      id="game-board"
      templateColumns={{ base: `repeat(${gridSize}, 6rem)`, md: `repeat(${gridSize}, 8rem)` }}
      gap={6}
    >
      {createGrid(gameTurns, gridSize).map((row, rowNum) =>
        row.map((symbol, colNum) => (
          <Button
            key={'' + rowNum + colNum}
            height={{ base: '6rem', md: '8rem' }}
            width={{ base: '6rem', md: '8rem' }}
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
