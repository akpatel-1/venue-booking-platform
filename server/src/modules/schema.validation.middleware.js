import { ApiError } from '../utils/api.error.util.js';
import { ERROR_CONFIG } from './error.config.js';

export function validateSchema(schema) {
  return (req, res, next) => {
    if (!req.body) {
      throw new ApiError(
        400,
        'Request body cannot be empty',
        ERROR_CONFIG.BODY_REQUIRED
      );
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        result.error.flatten(),
        ERROR_CONFIG.VALIDATION_ERROR
      );
    }

    req.data = result.data;

    next();
  };
}
