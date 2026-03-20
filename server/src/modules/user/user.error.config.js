export const USER_ERROR_CONFIG = {
  ACCOUNT_DEACTIVATED: {
    statusCode: 403,
    message: 'Your account has been deactivated. Please contact support.',
    code: 'ACCOUNT_DEACTIVATED',
  },
  USER_NOT_FOUND: {
    statusCode: 401,
    message: 'User not exists',
    code: 'USER_NOT_FOUND',
  },
  INVALID_TOKEN: {
    statusCode: 401,
    message: 'Invalid token structure',
    code: 'INVALID_TOKEN',
  },
  INVALID_OR_EXPIRED_OTP: {
    statusCode: 400,
    message: 'Invalid or expired OTP',
    code: 'INVALID_OR_EXPIRED_OTP',
  },
  OTP_RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    message: 'Too many OTP requests. Please try again after 10 minutes.',
    code: 'OTP_RATE_LIMIT_EXCEEDED',
  },
  ACCESS_TOKEN_MISSING: {
    statusCode: 401,
    message: 'Authentication required.',
    code: 'ACCESS_TOKEN_MISSING',
  },
};
