import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { VENDOR_ERROR_CONFIG } from '../vendor.error.config.js';
import { vendorApplicationRepository } from './vendor.application.repository.js';

export async function checkExistingApplication(req, res, next) {
  const status =
    await vendorApplicationRepository.findLatestVendorApplicationStatusByUserId(
      pool,
      req.userId
    );

  if (status === 'approved') {
    throw new ApiError(VENDOR_ERROR_CONFIG.ALREADY_VERIFIED);
  }

  if (status === 'pending') {
    throw new ApiError(VENDOR_ERROR_CONFIG.APPLICATION_PENDING);
  }

  next();
}
