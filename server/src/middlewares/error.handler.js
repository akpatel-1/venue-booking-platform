import multer from 'multer';

import { ApiError } from '../utils/api.error.util.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: 'File size exceeds allowed limit',
      LIMIT_FILE_COUNT: 'Too many files uploaded',
      LIMIT_UNEXPECTED_FILE: 'Unexpected file field',
    };

    return res.status(400).json({
      success: false,
      message: messages[err.code] || err.message,
      code: err.code,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  });
}
