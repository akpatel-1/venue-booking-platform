import { ERROR_CONFIG } from '../../config/error.config.js';
import { ApiError } from '../../utils/api.error.util.js';

export function verifyVendorRole(req, res, next) {
  if (req.user.role !== 'vendor') {
    throw new ApiError(ERROR_CONFIG.UNAUTHORIZED_REQUEST);
  }

  next();
}
