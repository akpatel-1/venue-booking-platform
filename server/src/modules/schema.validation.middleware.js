import { ApiError } from '../utils/api.error.util.js';

export function validateSchema(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source] || {};

    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0];

      throw new ApiError({
        statusCode: 400,
        message: firstError || 'Validation Error',
        code: 'VALIDATION_ERROR',
      });
    }

    req.data = req.data || {};
    req.data[source] = result.data;

    next();
  };
}
