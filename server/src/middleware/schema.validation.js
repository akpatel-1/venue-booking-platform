import ApiError from '../utils/api.error.js';

export default function validateSchema(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source] || {};

    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;

      throw new ApiError({
        statusCode: 400,
        message: firstError || 'Invalid request data',
        code: 'VALIDATION_ERROR',
      });
    }

    if (source === 'query') {
      Object.defineProperty(req, 'query', {
        value: result.data,
        writable: true,
        configurable: true,
      });
    } else {
      req[source] = result.data;
    }

    next();
  };
}
