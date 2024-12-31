import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const joinGameCommand = 'join';
export const joinGameRequestSchema = {
  type: 'object',
  properties: {
    command: { type: 'string', enum: [joinGameCommand] },
    name: { type: 'string' },
  },
  required: ['command', 'name'],
} as const satisfies JSONSchema;

export type JoinGameRequest = FromSchema<typeof joinGameRequestSchema>;
