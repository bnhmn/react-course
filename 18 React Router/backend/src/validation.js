import { validate as joiValidate, ValidationError } from 'express-validation';
export { Joi } from 'express-validation';

/**
 * Validate that the request body matches given schema.
 * On validation errors, an error message will be returned to the client.
 *
 * @param {import("express-validation").schema} schema
 */
export function validate(schema) {
  return joiValidate(
    schema,
    { context: true, keyByField: true },
    { abortEarly: false, allowUnknown: true, stripUnknown: true },
  );
}

/**
 * Converts validation error into client response.
 */
export function validationErrorHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(400).json(error);
  } else {
    console.error(error);
    res.status(500).json({ name: 'InternalServerError' });
  }
}
