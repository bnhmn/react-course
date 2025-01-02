import { GameType } from '../types/Game';
import { GameBoard } from './GameBoard';
import { GameLog } from './GameLog';
import { GameOver } from './GameOver';
import { Players } from './Players';

interface GameProps {
  game: GameType;
  onSelectSquare: (rowNum: number, colNum: number) => void;
  onRematch: () => void;
}

export function Game({ game, onSelectSquare, onRematch }: GameProps) {
  return (
    <>
      <Players
        players={game.players}
        activePlayerNumber={game.activePlayerNumber}
        ownPlayerNumber={game.ownPlayerNumber}
      />
      <GameBoard
        gameTurns={game.turns}
        gridSize={game.gridSize}
        onSelectSquare={onSelectSquare}
        isActive={game.state === 'running' && game.activePlayerNumber === game.ownPlayerNumber}
      />
      {(game.state === 'finished' || game.state === 'cancelled') && (
        <GameOver
          finished={game.state === 'finished'}
          cancelled={game.state === 'cancelled'}
          winner={game.players[game.winnerPlayerNumber]}
          onRematch={onRematch}
        />
      )}
    </>
  );
}
