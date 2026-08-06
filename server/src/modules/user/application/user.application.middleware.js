import { pool } from '../../../infrastructure/database/db.js';
import ApiError from '../../../utils/api.error.util.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { findLatestApplicationStatusByUserId } from './user.application.repository.js';

export async function requireDocument(req, res, next) {
  if (!req.file) {
    throw new ApiError(USER_ERROR_CONFIG.DOCUMENT_REQUIRED);
  }
  next();
}
export async function checkExistingApplication(req, res, next) {
  const status = await findLatestApplicationStatusByUserId(pool, req.userId);

  if (status && status !== 'rejected') {
    throw new ApiError(USER_ERROR_CONFIG.APPLICATION_ALREADY_EXISTS);
  }
  next();
}
