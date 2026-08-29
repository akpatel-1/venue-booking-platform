const ERROR_CONFIG = {
  VENUE_NOT_FOUND: {
    statusCode: 400,
    message: 'Venue not found',
    code: 'VENUE_NOT_FOUND',
  },
  FILE_UPLOAD_FAILED: {
    statusCode: 400,
    message: 'File upload failed please try again',
    code: 'FILE_UPLOAD_FAILED',
  },
  FILE_UPLOAD_LIMIT_EXCEEDED: {
    statusCode: 400,
    message: 'A maximum of 10 files can be uploaded ',
    code: 'FILE_UPLOAD_LIMIT_EXCEEDED',
  },
  INVALID_IMAGE_ID: {
    statusCode: 400,
    message: 'image_id is invalid for deletion',
    code: 'INVALID_IMAGE_ID',
  },
  REVERIFICATION_ALREADY_PENDING: {
    statusCode: 409,
    message: 'A reverification request is already pending',
    code: 'REVERIFICATION_ALREADY_PENDING',
  },
};

export default ERROR_CONFIG;
