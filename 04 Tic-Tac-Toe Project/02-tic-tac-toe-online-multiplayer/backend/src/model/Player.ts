import { createHash } from 'crypto';
import { JSONSchema } from 'json-schema-to-ts';
import { Schema, Validator } from 'jsonschema';
import { WebSocket } from 'ws';

import { JoinGameRequest, joinGameRequestSchema } from '../api/request/JoinGameRequest';
import { RestartGameRequest, restartGameRequestSchema } from '../api/request/RestartGameRequest';
import { SelectSquareRequest, selectSquareRequestSchema } from '../api/request/SelectSquareRequest';
import { ConnectResponse } from '../api/response/ConnectResponse';
import { Game } from './Game';
import { findOpenLobby, Lobby } from './Lobby';

export class Player {
  constructor(public name: string, public connection: PlayerConnection) {}
}

export class PlayerConnection {
  private id: string;
  private ws: WebSocket;
  private lobby?: Lobby;
  private game?: Game;

  constructor(ws: WebSocket) {
    this.id = createHash('sha1').update(new Date().toISOString()).digest('hex').substring(0, 10);
    this.ws = ws;
    this.setupWebSocket();
  }

  static create(ws: WebSocket) {
    return new PlayerConnection(ws);
  }

  sendMessage(data: object) {
    this.ws.send(JSON.stringify(data, null, 2));
  }

  handleMessage(data: JoinGameRequest | SelectSquareRequest | RestartGameRequest) {
    switch (data?.command) {
      case 'join':
        this.handleJoinGame(data);
        break;
      case 'select':
        this.handleSelectSquare(data);
        break;
      case 'restart':
        this.handleRestartGame(data);
        break;
    }
  }

  @Valid(joinGameRequestSchema)
  private handleJoinGame(data: JoinGameRequest) {
    if (!this.lobby && !this.game) {
      this.lobby = findOpenLobby({ gridSize: data.gridSize });
      this.lobby.onUpdate((lobby) => this.sendMessage(lobby.toResponse()));
      this.lobby.onGameStart((game) => {
        this.lobby = undefined;
        this.game = game;
        this.game.onUpdate(() => this.sendMessage(game.toResponse(this)));
      });
      this.lobby.addPlayer(data.name, this);
    }
  }

  @Valid(selectSquareRequestSchema)
  private handleSelectSquare(data: SelectSquareRequest) {
    if (this.game) {
      this.game.addTurn(this, data.rowNum, data.colNum);
    }
  }

  @Valid(restartGameRequestSchema)
  private handleRestartGame(_: RestartGameRequest) {
    if (this.game) {
      this.game.start();
    }
  }

  private setupWebSocket() {
    this.log('connected');
    this.ws.on('message', (data) => {
      this.log(`received ${data}`);
      try {
        this.handleMessage(JSON.parse(data.toString()));
      } catch (error) {
        this.log(error, { error: true });
      }
    });
    this.ws.on('error', (error) => {
      this.log(JSON.stringify(error), { error: true });
    });
    this.ws.on('close', () => {
      this.log('disconnected');
      this.lobby?.removePlayer(this);
      this.game?.cancel();
    });
    this.sendMessage({ type: 'connected' } satisfies ConnectResponse);
  }

  disconnect() {
    this.ws.close();
  }

  private log(message: any, opts = { error: false }) {
    console.log(
      `Player ${this.id}${this.game ? ` Game ${this.game.id}` : ''}: ${opts.error ? 'error: ' : ''}${message}`,
    );
  }
}

/**
 * A class method decorator that validates that the method argument complies with the JSON schema.
 * Only executes the method if no validation errors occur.
 */
function Valid(jsonSchema: JSONSchema) {
  return (targetClass: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const validator = new Validator();

    descriptor.value = function (...args: any[]) {
      const result = validator.validate(args[0], jsonSchema as Schema);
      if (result.valid) {
        return originalMethod.apply(this, args);
      } else {
        (this as PlayerConnection).sendMessage({ errors: result.errors.map((error) => error.message) });
      }
    };

    return descriptor;
  };
}
