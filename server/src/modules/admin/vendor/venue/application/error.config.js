export const APPLICATION_ERROR_CONFIG = {
  APPLICATION_NOT_PENDING: {
    statusCode: 409,
    message: 'No pending application found',
    code: 'APPLICATION_NOT_PENDING',
  },
  INVALID_STATUS: {
    statusCode: 400,
    message: 'Invalid application status',
    code: 'INVALID_APPLICATION_STATUS',
  },
};
