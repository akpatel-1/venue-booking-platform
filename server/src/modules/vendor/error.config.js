export const VENDOR_ERROR_CONFIG = {
  FILE_TYPE_MISMATCH: {
    statusCode: 400,
    message: 'Invalid file type. Only JPG and PNG are allowed.',
    code: 'FILE_TYPE_MISMATCH',
  },
  ALREADY_VERIFIED: {
    statusCode: 409,
    message: 'Vendor already verified',
    code: 'ALREADY_VERIFIED',
  },
  APPLICATION_PENDING: {
    statusCode: 409,
    message: 'Application already under review',
    code: 'APPLICATION_PENDING',
  },

  APPLICATION_ERROR: {
    statusCode: 500,
    message: 'Application processing failed',
    code: 'APPLICATION_ERROR',
  },

  VENDOR_NOT_FOUND: {
    statusCode: 401,
    message: 'VENDOR not exists',
    code: 'VENDOR_NOT_FOUND',
  },
  VENDOR_SUSPENDED: {
    statusCode: 403,
    message: 'VENDOR is suspended',
    code: 'VENDOR_SUSPENDED',
  },
};
