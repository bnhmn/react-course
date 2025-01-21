import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const restartGameCommand = 'restart';
export const restartGameRequestSchema = {
  type: 'object',
  properties: {
    command: { type: 'string', enum: [restartGameCommand] },
  },
  required: ['command'],
} as const satisfies JSONSchema;

export type RestartGameRequest = FromSchema<typeof restartGameRequestSchema>;
