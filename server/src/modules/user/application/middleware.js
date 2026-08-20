import { pool } from '../../../infrastructure/database/db.js';
import ApiError from '../../../utils/api.error.js';
import { USER_ERROR_CONFIG } from '../error.config.js';
import { findLatestApplicationStatusByUserId } from './repository.js';

export async function checkExistingApplication(req, res, next) {
  const status = await findLatestApplicationStatusByUserId(pool, req.user.id);

  if (status && status !== 'rejected') {
    throw new ApiError(USER_ERROR_CONFIG.APPLICATION_ALREADY_EXISTS);
  }
  next();
}
