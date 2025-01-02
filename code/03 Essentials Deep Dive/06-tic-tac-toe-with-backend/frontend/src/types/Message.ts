import { GameType } from './Game';
import { LobbyType } from './Lobby';

type ConnectedMessage = { type: 'connected' };
type LobbyMessage = { type: 'lobby' } & LobbyType;
type GameMessage = { type: 'game' } & GameType;

export type MessageType = ConnectedMessage | LobbyMessage | GameMessage;
