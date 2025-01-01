import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const connectResponseSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['connected'] },
  },
  required: ['type'],
} as const satisfies JSONSchema;

export type ConnectResponse = FromSchema<typeof connectResponseSchema>;
