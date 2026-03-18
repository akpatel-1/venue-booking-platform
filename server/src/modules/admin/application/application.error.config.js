export const ADMIN_ERROR_CONFIG = {
  EMPTY_STATUS: {
    statusCode: 400,
    message: 'Status cannot be empty',
    code: 'EMPTY_STATUS',
  },

  MULTIPLE_STATUS_VALUES: {
    statusCode: 400,
    message: 'Multiple status values not allowed',
    code: 'MULTIPLE_STATUS_VALUES',
  },

  INVALID_STATUS: {
    statusCode: 400,
    message: 'Invalid status value',
    code: 'INVALID_STATUS',
  },
};
