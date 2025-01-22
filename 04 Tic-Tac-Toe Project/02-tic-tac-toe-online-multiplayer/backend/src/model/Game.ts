import { createHash } from 'crypto';

import { GameResponse } from '../api/response/GameResponse';
import { findWinner, GameTurn } from './GameTurn';
import { Player, PlayerConnection } from './Player';

export type GameState = 'created' | 'running' | 'finished' | 'cancelled';
export type GamePlayerSymbol = 'X' | 'O';
export type GameUpdateListener = (game: Game) => void;

export interface GamePlayer {
  number: number;
  name: string;
  symbol: GamePlayerSymbol;
  connection: PlayerConnection;
}

export class Game {
  constructor(
    public id = createHash('sha1').update(new Date().toISOString()).digest('hex').substring(0, 10),
    public state: GameState = 'created',
    public gridSize: number = 3,
    public players: GamePlayer[] = [],
    public turns: GameTurn[] = [],
    public activePlayer: number = 0,
    public winner: number | null = null,
    public round: number = -1,
    private updateListeners: GameUpdateListener[] = [],
  ) {}

  static create(opts: { players: Player[]; gridSize: number }): Game {
    const game = new Game();
    opts.players.forEach((player) => game.addPlayer(player));
    game.gridSize = opts.gridSize;
    return game;
  }

  addPlayer(player: Player) {
    this.players.push({
      name: player.name,
      connection: player.connection,
      number: this.players.length,
      symbol: this.players.length === 0 ? 'X' : 'O',
    });
  }

  findPlayer(query: GamePlayerSymbol | PlayerConnection): GamePlayer {
    return this.players.filter(
      typeof query === 'string' ? (player) => player.symbol === query : (player) => player.connection === query,
    )[0];
  }

  start() {
    if (this.state === 'created' || this.state === 'finished') {
      this.state = 'running';
      this.turns = [];
      this.round += 1;
      this.activePlayer = this.round % this.players.length;
      this.winner = null;
      this.handleUpdate();
    }
  }

  addTurn(playerConnection: PlayerConnection, rowNum: number, colNum: number) {
    const player = this.findPlayer(playerConnection);
    if (this.isValidTurn(player, rowNum, colNum)) {
      this.turns.push(new GameTurn(player.symbol, rowNum, colNum));
      this.switchToNextPlayer();
      this.computeWinner();
      this.handleUpdate();
    }
  }

  private isValidTurn(player: GamePlayer, rowNum: number, colNum: number): boolean {
    return (
      this.state === 'running' &&
      this.activePlayer === player.number &&
      rowNum < this.gridSize &&
      colNum < this.gridSize &&
      !this.turns.some((turn) => turn.rowNum === rowNum && turn.colNum === colNum)
    );
  }

  private switchToNextPlayer() {
    this.activePlayer = (this.activePlayer + 1) % this.players.length;
  }

  private computeWinner() {
    const { isGameOver, winnerSymbol } = findWinner(this.turns, this.gridSize);
    if (isGameOver) {
      this.state = 'finished';
      this.winner = winnerSymbol ? this.findPlayer(winnerSymbol as GamePlayerSymbol).number : null;
    }
  }

  cancel() {
    if (this.state === 'running') {
      this.state = 'cancelled';
      this.handleUpdate();
    }
    this.players.forEach((player) => player.connection.disconnect());
  }

  toResponse(player: PlayerConnection): GameResponse {
    return {
      type: 'game',
      id: this.id,
      state: this.state,
      players: this.players.map((player) => ({ number: player.number, name: player.name, symbol: player.symbol })),
      turns: this.turns.map((turn) => turn.toResponse()),
      gridSize: this.gridSize,
      ownPlayerNumber: this.findPlayer(player)?.number,
      activePlayerNumber: this.activePlayer,
      winnerPlayerNumber: this.winner,
    };
  }

  onUpdate(updateListener: GameUpdateListener) {
    this.updateListeners.push(updateListener);
  }

  private handleUpdate() {
    this.updateListeners.forEach((handle) => handle(this));
  }
}
