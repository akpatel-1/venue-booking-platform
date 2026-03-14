import { ApiError } from '../utils/api.error.util.js';
import { ERROR_CONFIG } from './error.config.js';

export function validateSchema(schema) {
  return (req, res, next) => {
    if (!req.body) {
      throw new ApiError(ERROR_CONFIG.BODY_REQUIRED);
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(ERROR_CONFIG.VALIDATION_ERROR);
    }

    req.data = result.data;

    next();
  };
}
