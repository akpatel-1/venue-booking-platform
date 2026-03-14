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
  DOCUMENT_REQUIRED: {
    statusCode: 400,
    message: 'Verification document is required',
    code: 'DOCUMENT_REQUIRED',
  },
};
