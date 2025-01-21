import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const selectSquareCommand = 'select';
export const selectSquareRequestSchema = {
  type: 'object',
  properties: {
    command: { type: 'string', enum: [selectSquareCommand] },
    rowNum: { type: 'integer', minimum: 0, maximum: 3 },
    colNum: { type: 'integer', minimum: 0, maximum: 3 },
  },
  required: ['command', 'rowNum', 'colNum'],
} as const satisfies JSONSchema;

export type SelectSquareRequest = FromSchema<typeof selectSquareRequestSchema>;
