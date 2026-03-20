import { ApiError } from '../../../utils/api.error.util.js';
import { VENDOR_ERROR_CONFIG } from '../vendor.error.config.js';

export async function requireDocument(req, res, next) {
  if (!req.file) {
    throw new ApiError(VENDOR_ERROR_CONFIG.DOCUMENT_REQUIRED);
  }
  next();
}
