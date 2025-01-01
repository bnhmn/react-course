import { LobbyResponse } from '../api/response/LobbyResponse';
import { Game, GameUpdateListener } from './Game';
import { Player, PlayerConnection } from './Player';

export type LobbyState = 'waiting' | 'ready' | 'started';
export type LobbyUpdateListener = (lobby: Lobby) => void;

export class Lobby {
  constructor(
    public state: LobbyState,
    public gridSize: number,
    public numPlayers: number = 2,
    public players: Player[] = [],
    private game: Game | null = null,
    private updateListeners: LobbyUpdateListener[] = [],
    private gameStartListeners: GameUpdateListener[] = [],
  ) {}

  static create({ gridSize } = { gridSize: 3 }): Lobby {
    return new Lobby('waiting', gridSize);
  }

  addPlayer(name: string, connection: PlayerConnection) {
    if (this.players.length < this.numPlayers) {
      this.players.push(new Player(name, connection));
      if (this.players.length === this.numPlayers) {
        this.startGame();
      }
      this.handleUpdate();
    }
  }

  removePlayer(connection: PlayerConnection) {
    if (this.state !== 'started') {
      this.players = this.players.filter((player) => player.connection !== connection);
      this.state = 'waiting';
      this.handleUpdate();
    }
  }

  private startGame(waitSeconds = 2) {
    this.state = 'ready';
    this.sleep(waitSeconds).then(() => {
      // Only start the game if no player left in the meantime
      if (this.state === 'ready') {
        this.game = Game.create({ players: this.players, gridSize: this.gridSize });
        this.handleGameStart();
        this.game.start();
        this.state = 'started';
      }
    });
    this.handleUpdate();
  }

  onUpdate(updateListener: LobbyUpdateListener) {
    this.updateListeners.push(updateListener);
  }

  onGameStart(gameStartListener: GameUpdateListener) {
    this.gameStartListeners.push(gameStartListener);
  }

  toResponse(): LobbyResponse {
    return {
      type: 'lobby',
      state: this.state,
      gridSize: this.gridSize,
      players: this.players.map((player) => ({ name: player.name })),
    };
  }

  private handleUpdate() {
    this.updateListeners.forEach((onUpdate) => onUpdate(this));
  }

  private handleGameStart() {
    this.gameStartListeners.forEach((onStart) => onStart(this.game!));
  }

  private sleep(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
  }
}

const lobbies: Lobby[] = [];

export function findOpenLobby({ gridSize }: { gridSize: number }): Lobby {
  const openLobbies = lobbies.filter((lobby) => lobby.state === 'waiting' && lobby.gridSize === gridSize);
  if (openLobbies.length > 0) {
    return openLobbies[0];
  } else {
    const lobby = Lobby.create({ gridSize });
    lobbies.push(lobby);
    return lobby;
  }
}
