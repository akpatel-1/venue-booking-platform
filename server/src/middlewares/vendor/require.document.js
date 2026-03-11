import { ApiError } from '../../utils/api.error.util.js';

export async function requireDocument(req, res, next) {
  if (!req.file) {
    throw new ApiError(
      400,
      'Verification document is required',
      'DOCUMENT_REQUIRED'
    );
  }
  next();
}
