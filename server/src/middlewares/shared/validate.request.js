import { ApiError } from '../../utils/api.error.util.js';

export function validateRequest(schema) {
  return (req, res, next) => {
    if (!req.body) {
      throw new ApiError(400, 'Request body cannot be empty', 'BODY_REQUIRED');
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, result.error.flatten(), 'VALIDATION_ERROR');
    }

    req.data = result.data;

    next();
  };
}
