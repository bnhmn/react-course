import { ValidationError, Validator } from 'express-json-validator-middleware';

const validator = new Validator({ allErrors: true });

/**
 * Validate that the request body matches given JSON Schema.
 * On validation errors, an error message will be returned to the client.
 *
 * @param {import("json-schema").JSONSchema4} jsonSchema
 */
export function validateSchema(jsonSchema) {
  return validator.validate({ body: jsonSchema });
}

/**
 * Converts validation error into client response.
 */
export function validationErrorHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(400).json({
      code: 'validation-error',
      errors: error.validationErrors.body.map((error) => ({
        location: 'body',
        field: error.instancePath,
        message: error.message,
      })),
    });
  } else {
    console.error(error);
    next();
  }
}
