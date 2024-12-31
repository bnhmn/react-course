import { createHash } from 'crypto';

import { GameInfoResponse } from '../dto/GameInfoResponse';
import { findWinner, GameTurn } from './GameTurn';
import { Player } from './Player';

export type GameState = 'matchmaking' | 'lobby' | 'running' | 'finished' | 'cancelled';
export type PlayerSymbol = 'X' | 'O';

export class Game {
  constructor(
    public id = createHash('sha1').update(new Date().toISOString()).digest('hex').substring(0, 10),
    public state: GameState = 'matchmaking',
    public players: Player[] = [],
    public turns: GameTurn[] = [],
    public activePlayer: number = 0,
    public winner: Player | null = null,
    public gridSize: number = 3,
  ) {}

  addPlayer(player: Player) {
    const number = this.players.length;
    const symbol = number === 0 ? 'X' : 'O';
    this.players.push(player);
    if (this.players.length == 2) {
      this.state = 'lobby';
    }
    return { number, symbol };
  }

  findPlayer(symbol: string) {
    return this.players.filter((player) => player.symbol === symbol)[0];
  }

  isRunning() {
    return this.state === 'running';
  }

  isFinished() {
    return this.state === 'finished';
  }

  isPlayerActive(player: Player) {
    return player === this.players[this.activePlayer];
  }

  start() {
    if ((this.state === 'lobby' || this.state === 'finished') && this.players.every((player) => player.ready)) {
      this.state = 'running';
      this.turns = [];
      this.activePlayer = 0;
      this.winner = null;
      this.pushGameInfo();
    }
  }

  addTurn(player: Player, rowNum: number, colNum: number) {
    if (this.state === 'running') {
      this.turns.push(new GameTurn(player.symbol, rowNum, colNum));
      this.activePlayer = (this.activePlayer + 1) % this.players.length;
      const { isGameOver, winner } = findWinner(this.turns, this.gridSize);
      if (isGameOver) {
        this.state = 'finished';
        this.winner = winner ? this.findPlayer(winner) : null;
      }
      this.pushGameInfo();
    }
  }

  cancel() {
    this.state = 'cancelled';
    this.pushGameInfo();
    this.players.forEach((player) => player.closeWebSocket());
  }

  /**
   * Transmit the current game status to one or more players. By default, it will be transmitted to all players.
   */
  pushGameInfo(players = this.players) {
    players.forEach((player) =>
      player.sendMessage({
        id: this.id,
        state: this.state,
        players: this.players.map((player) => player.toResponse()),
        turns: this.turns.map((turn) => turn.toResponse()),
        ownPlayerNumber: player.number,
        activePlayerNumber: this.activePlayer,
        winnerPlayerNumber: this.winner?.number ?? null,
      } satisfies GameInfoResponse),
    );
  }
}

const games: Game[] = [];

export function findOpenGame(): Game {
  const openGames = games.filter((game) => game.state === 'matchmaking');
  if (openGames.length > 0) {
    return openGames[0];
  } else {
    const newGame = new Game();
    games.push(newGame);
    return newGame;
  }
}
