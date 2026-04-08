import { ApiError } from '../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../error.config.js';

export function verifyVendorRole(req, res, next) {
  if (req.user.role !== 'vendor') {
    throw new ApiError(ERROR_CONFIG.UNAUTHORIZED_REQUEST);
  }

  next();
}
