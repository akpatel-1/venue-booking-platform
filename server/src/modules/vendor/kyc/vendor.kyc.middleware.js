import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { VENDOR_ERROR_CONFIG } from '../vendor.error.config.js';
import { vendorApplicationRepository } from './vendor.kyc.repository.js';

export async function checkExistingApplication(req, res, next) {
  const status =
    await vendorApplicationRepository.findLatestVendorApplicationStatusByUserId(
      pool,
      req.userId
    );

  if (status && status !== 'rejected') {
    return res.status(200).json({ state: status });
  }
  next();
}
