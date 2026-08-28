import ApiError from '../utils/api.error.js';

export default function validateSchema(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source] || {};

    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;

      throw new ApiError({
        statusCode: 400,
        message: firstError || 'Validation Error',
        code: 'VALIDATION_ERROR',
      });
    }

    req.data = {
      ...req.data,
      ...result.data,
    };
    next();
  };
}
