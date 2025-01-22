import { GameTurnType } from './GameTurn';
import { PlayerType } from './Player';

export type GameState = 'created' | 'running' | 'finished' | 'cancelled';

export interface GameType {
  state: GameState;
  players: PlayerType[];
  turns: GameTurnType[];
  gridSize: number;
  ownPlayerNumber: number;
  activePlayerNumber: number;
  winnerPlayerNumber: number;
}
