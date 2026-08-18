import { ERROR_CONFIG } from '../../config/error.config.js';
import ApiError from '../../utils/api.error.js';
import { VENDOR_ERROR_CONFIG } from './error.config.js';
import { findVendorId } from './repository.js';

export default async function ensureVendorAccess(req, res, next) {
  if (req.user.role !== 'vendor') {
    throw new ApiError(ERROR_CONFIG.UNAUTHORIZED_REQUEST);
  }
  const vendor = await findVendorId(req.user.id);

  if (!vendor) {
    throw new ApiError(VENDOR_ERROR_CONFIG.VENDOR_NOT_FOUND);
  }

  if (vendor.is_suspended) {
    throw new ApiError(VENDOR_ERROR_CONFIG.VENDOR_SUSPENDED);
  }
  req.vendor = { id: vendor.id };
  next();
}
