import { ERROR_CONFIG } from '../../../config/error.config.js';
import { pool } from '../../../infrastructure/database/db.js';
import ApiError from '../../../utils/api.error.js';
import { USER_ERROR_CONFIG } from '../../user/error.config.js';
import { VENDOR_ERROR_CONFIG } from '../error.config.js';
import { findVendorProfileByUserId } from './repository.js';

export async function fetchVendorProfile(user) {
  const data = await findVendorProfileByUserId(pool, user.id);
  if (!data) {
    throw new ApiError(VENDOR_ERROR_CONFIG.VENDOR_NOT_FOUND);
  }
  return { ...user, ...data };
}
