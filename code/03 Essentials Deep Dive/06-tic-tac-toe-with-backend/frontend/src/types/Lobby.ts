import { PlayerType } from './Player';

export interface LobbyType {
  state: 'waiting' | 'ready' | 'closed';
  players: PlayerType[];
  gridSize: number;
}
