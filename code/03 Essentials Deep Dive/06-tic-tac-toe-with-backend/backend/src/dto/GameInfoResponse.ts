import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const playerSchema = {
  type: 'object',
  properties: {
    number: { type: 'number' },
    name: { type: 'string' },
    symbol: { type: 'string', pattern: '[A-Z]', examples: ['X', 'O'] },
    ready: { type: 'boolean' },
  },
  required: ['number', 'name', 'symbol', 'ready'],
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

export const gameInfoSchema = {
  type: 'object',
  properties: {
    state: { type: 'string', enum: ['matchmaking', 'lobby', 'running', 'cancelled', 'finished'] },
    players: {
      type: 'array',
      items: playerSchema,
    },
    turns: {
      type: 'array',
      items: gameTurnSchema,
    },
    ownPlayerNumber: { type: 'number', description: `The client's player number.` },
    activePlayerNumber: { type: 'number' },
    winnerPlayerNumber: { type: ['number', 'null'] },
  },
  required: ['state', 'players', 'turns', 'ownPlayerNumber', 'activePlayerNumber', 'winnerPlayerNumber'],
} as const satisfies JSONSchema;

export type PlayerResponse = FromSchema<typeof playerSchema>;
export type GameTurnResponse = FromSchema<typeof gameTurnSchema>;
export type GameInfoResponse = FromSchema<typeof gameInfoSchema>;
