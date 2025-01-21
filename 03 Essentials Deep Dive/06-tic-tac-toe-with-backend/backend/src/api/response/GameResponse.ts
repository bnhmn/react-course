import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const playerSchema = {
  type: 'object',
  properties: {
    number: { type: 'number' },
    name: { type: 'string' },
    symbol: { type: 'string', pattern: '[A-Z]', examples: ['X', 'O'] },
  },
  required: ['number', 'name', 'symbol'],
} as const satisfies JSONSchema;

const gameTurnSchema = {
  type: 'object',
  properties: {
    symbol: { type: 'string', pattern: '[A-Z]', examples: ['X', 'O'] },
    rowNum: { type: 'integer', minimum: 0, maximum: 2 },
    colNum: { type: 'integer', minimum: 0, maximum: 2 },
  },
  required: ['symbol', 'rowNum', 'colNum'],
} as const satisfies JSONSchema;

export const gameSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['game'] },
    state: { type: 'string', enum: ['created', 'running', 'cancelled', 'finished'] },
    players: { type: 'array', items: playerSchema },
    turns: { type: 'array', items: gameTurnSchema },
    gridSize: { type: 'integer', minimum: 3, maximum: 4, default: 3 },
    ownPlayerNumber: { type: 'number', description: `The client's player number.` },
    activePlayerNumber: { type: 'number' },
    winnerPlayerNumber: { type: ['number', 'null'] },
  },
  required: [
    'type',
    'state',
    'players',
    'turns',
    'gridSize',
    'ownPlayerNumber',
    'activePlayerNumber',
    'winnerPlayerNumber',
  ],
} as const satisfies JSONSchema;

export type PlayerResponse = FromSchema<typeof playerSchema>;
export type GameTurnResponse = FromSchema<typeof gameTurnSchema>;
export type GameResponse = FromSchema<typeof gameSchema>;
