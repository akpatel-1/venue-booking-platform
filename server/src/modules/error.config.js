export const ERROR_CONFIG = {
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: 'Invalid email or password',
    code: 'INVALID_CREDENTIALS',
  },
  SESSION_EXPIRED: {
    statusCode: 401,
    message: 'Your session has expired, please login again',
    code: 'SESSION_EXPIRED',
  },
  UNAUTHORIZED: {
    statusCode: 403,
    message: 'You are not authorized to perform this action',
    code: 'UNAUTHORIZED_REQUEST',
  },
  REQUIRED: {
    statusCode: 401,
    message: 'Credentials are required',
    code: 'CREDENTIALS_REQUIRED',
  },

  VALIDATION_ERROR: {
    statusCode: 422,
    message: 'Validation failed',
    code: 'VALIDATION_ERROR',
  },
  BODY_REQUIRED: {
    statusCode: 400,
    message: 'Request body is required',
    code: 'BODY_REQUIRED',
  },
  EMAIL_SEND_FAILED: {
    statusCode: 500,
    message: 'Failed to send OTP email',
    code: 'EMAIL_SEND_FAILED',
  },
  
};
