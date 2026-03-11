import { pool } from '../../infrastructure/database/db.js';
import { findLatestVendorApplicationByUserId } from '../../models/vendor/vendor.verification.model.js';
import { ApiError } from '../../utils/api.error.util.js';

export async function requireVendorAccess(req, res, next) {
  if (req.user.role !== 'vendor') {
    throw new ApiError(403, 'Vendor access required', 'VENDOR_ACCESS_REQUIRED');
  }

  const profile = await findLatestVendorApplicationByUserId(pool, req.userId);

  if (!profile) {
    throw new ApiError(
      403,
      'Vendor profile not found',
      'VENDOR_PROFILE_NOT_FOUND'
    );
  }

  if (profile.is_suspended) {
    throw new ApiError(403, profile.suspension_reason, 'VENDOR_SUSPENDED');
  }

  next();
}
