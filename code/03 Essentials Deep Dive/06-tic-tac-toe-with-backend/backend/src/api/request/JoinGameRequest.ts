import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const joinGameCommand = 'join';
export const joinGameRequestSchema = {
  type: 'object',
  properties: {
    command: { type: 'string', enum: [joinGameCommand] },
    name: { type: 'string' },
    gridSize: { type: 'integer', minimum: 3, maximum: 4 },
  },
  required: ['command', 'name', 'gridSize'],
} as const satisfies JSONSchema;

export type JoinGameRequest = FromSchema<typeof joinGameRequestSchema>;
