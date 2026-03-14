import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { vendorApplicationRepository } from './vendor.application.repository.js';

export async function checkExistingApplication(req, res, next) {
  const status =
    await vendorApplicationRepository.findLatestVendorApplicationStatusByUserId(
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
