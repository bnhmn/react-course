import { GameType } from '../backend/types/Game';
import { GameTurnType } from '../backend/types/GameTurn';
import { PlayerType } from '../backend/types/Player';

interface GameLogProps {
  game: GameType;
  reversed?: boolean;
  disabled?: boolean;
  numEntries?: number;
}

export function GameLog({ game, reversed = true, disabled = false, numEntries = 3 }: GameLogProps) {
  if (disabled) {
    return;
  }
  let logEntries = createLogEntries(game.turns, game.players).map((entry, index) => <li key={index}>{entry}</li>);
  if (reversed) {
    logEntries = logEntries.reverse();
  }
  logEntries = logEntries.slice(0, numEntries);
  return <ol id="log">{logEntries}</ol>;
}

function createLogEntries(gameTurns: GameTurnType[], players: PlayerType[]): string[] {
  return gameTurns.map(({ rowNum, colNum, symbol }) => {
    const player = players.filter((player) => player.symbol === symbol)[0];
    return `${player.name} selected (${rowNum},${colNum})`;
  });
}
