import { pool } from '../../infrastructure/database/db.js';
import { findLatestVendorApplicationStatusByUserId } from '../../models/vendor/vendor.verification.model.js';
import { ApiError } from '../../utils/api.error.util.js';

export async function checkExistingApplication(req, res, next) {
  const status = await findLatestVendorApplicationStatusByUserId(
    pool,
    req.userId
  );

  if (status === 'approved') {
    throw new ApiError(409, 'Vendor already verified', 'ALREADY_VERIFIED');
  }

  if (status === 'pending') {
    throw new ApiError(
      409,
      'Application already under review',
      'APPLICATION_PENDING'
    );
  }

  next();
}
