import { GameBoard } from './GameBoard';
import { GameLog } from './GameLog';
import { GameOver } from './GameOver';
import { Players } from './Players';

export function Game({ game, onSelectSquare = (rowNum, colNum) => null, onRematch = () => null }) {
  const { state, players, turns, gridSize, ownPlayerNumber, activePlayerNumber, winnerPlayerNumber } = game;
  const isRunning = state === 'running';
  const isFinished = state === 'finished';
  const isCancelled = state === 'cancelled';
  const isGameOver = isFinished || isCancelled;
  const winner = players[winnerPlayerNumber];

  return (
    <>
      <main id="game-container">
        <Players players={players} activePlayerNumber={activePlayerNumber} ownPlayerNumber={ownPlayerNumber} />
        <GameBoard
          gameTurns={turns}
          gridSize={gridSize}
          onSelectSquare={onSelectSquare}
          isActive={isRunning && activePlayerNumber === ownPlayerNumber}
        />
        {isGameOver && <GameOver finished={isFinished} cancelled={isCancelled} winner={winner} onRematch={onRematch} />}
      </main>
      <GameLog gameTurns={turns} players={players} />
    </>
  );
}
