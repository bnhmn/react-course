import { Validator } from 'jsonschema';
import { WebSocket } from 'ws';

import { PlayerResponse } from '../dto/GameInfoResponse';
import { JoinGameRequest, joinGameRequestSchema } from '../dto/JoinGameRequest';
import { RestartGameRequest, restartGameRequestSchema } from '../dto/RestartGameRequest';
import { SelectSquareRequest, selectSquareRequestSchema } from '../dto/SelectSquareRequest';
import { Game } from './Game';

export function createPlayer(opts: { ws: WebSocket; game: Game }) {
  return new Player(opts.ws, opts.game);
}

export class Player {
  number: number;
  name: string;
  symbol: string;
  ready: boolean;

  constructor(private ws: WebSocket, private game: Game) {
    const { number, symbol } = game.addPlayer(this);
    this.number = number;
    this.name = `Player ${number}`;
    this.symbol = symbol;
    this.ready = false;
    this.setupWebSocket();
  }

  toResponse(): PlayerResponse {
    return {
      number: this.number,
      name: this.name,
      symbol: this.symbol,
      ready: this.ready,
    };
  }

  sendMessage(data: object) {
    const json = JSON.stringify(data, null, 2);
    // this.log(`sent: ${json}`);
    this.ws.send(json);
  }

  handleMessage(data: JoinGameRequest | SelectSquareRequest | RestartGameRequest) {
    switch (data?.command) {
      case 'join':
        this.handleJoinGameRequest(data);
        break;
      case 'select':
        this.handleSelectSquareRequest(data);
        break;
      case 'restart':
        this.handleRestartGameRequest(data);
        break;
    }
  }

  @Valid(joinGameRequestSchema)
  private handleJoinGameRequest(data: JoinGameRequest) {
    if (!this.ready) {
      this.name = data.name;
      this.ready = true;
      this.game.pushGameInfo();
      this.game.start();
    }
  }

  @Valid(selectSquareRequestSchema)
  private handleSelectSquareRequest(data: SelectSquareRequest) {
    if (this.game.isRunning() && this.game.isPlayerActive(this)) {
      this.game.addTurn(this, data.rowNum, data.colNum);
    }
  }

  @Valid(restartGameRequestSchema)
  private handleRestartGameRequest(_: RestartGameRequest) {
    if (this.game.isFinished()) {
      this.game.start();
    }
  }

  private setupWebSocket() {
    this.log('connected');
    this.ws.on('message', (data) => {
      this.log(`received: ${data}`);
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
      this.game.cancel();
    });
    this.game.pushGameInfo([this]);
  }

  closeWebSocket() {
    this.ws.close();
  }

  private log(message: any, opts = { error: false }) {
    console.log(`Game ${this.game.id} player ${this.number}: ${opts.error ? 'error: ' : ''}${message}`);
  }
}

const validator = new Validator();

/**
 * A class method decorator that validates that the method argument complies with the JSON schema.
 * Only executes the method if no validation errors occur.
 */
function Valid(schema: object) {
  return (targetClass: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = validator.validate(args[0], schema);
      if (result.valid) {
        return originalMethod.apply(this, args);
      } else {
        (this as Player).sendMessage({ errors: result.errors.map((error) => error.message) });
      }
    };

    return descriptor;
  };
}
