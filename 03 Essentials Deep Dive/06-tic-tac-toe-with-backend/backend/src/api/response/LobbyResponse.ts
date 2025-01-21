import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const lobbySchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['lobby'] },
    state: { type: 'string', enum: ['waiting', 'ready', 'started'] },
    players: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
      },
    },
    gridSize: { type: 'integer', minimum: 3, maximum: 4, default: 3 },
  },
  required: ['type', 'state', 'players'],
} as const satisfies JSONSchema;

export type LobbyResponse = FromSchema<typeof lobbySchema>;
