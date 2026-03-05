import { pool } from '../../infrastructure/database/db.js';
import { findUserById } from '../../models/vendor/vendor.verification.model.js';
import { ApiError } from '../../utils/api.error.util.js';

export async function ensureAccountActive(req, res, next) {
  const user = await findUserById(pool, req.userId);

  if (!user) {
    throw new ApiError(401, 'User not exists', 'USER_NOT_FOUND');
  }

  if (user.status === 'banned') {
    throw new ApiError(
      403,
      'Your account has been deactivated. Please contact support.',
      'ACCOUNT_DEACTIVATED'
    );
  }
  req.user = user;
  next();
}
