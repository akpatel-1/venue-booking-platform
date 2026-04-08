import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { USER_ERROR_CONFIG } from '../../user/user.error.config.js';
import { VENDOR_ERROR_CONFIG } from '../vendor.error.config.js';
import { repository } from './vendor.dash.repository.js';

export const service = {
  async fetchVendorProfile(user) {
    const data = await repository.getVendorProfileByUserId(pool, user.id);
    if (!data) {
      throw new ApiError(VENDOR_ERROR_CONFIG.VENDOR_NOT_FOUND);
    }
    return { ...user, ...data };
  },
};
