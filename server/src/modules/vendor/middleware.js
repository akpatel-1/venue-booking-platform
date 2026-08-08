import { ERROR_CONFIG } from '../../config/error.config.js';
import ApiError from '../../utils/api.error.js';

export default function verifyVendorRole(req, res, next) {
  if (req.user.role !== 'vendor') {
    throw new ApiError(ERROR_CONFIG.UNAUTHORIZED_REQUEST);
  }

  next();
}
