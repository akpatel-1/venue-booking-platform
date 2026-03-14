import jwt from 'jsonwebtoken';

import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { userAuthRepository } from './user.auth.repository.js';

export const userAuthMiddleware = {
  async authenticateToken(req, res, next) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new ApiError(401, 'Authentication required', 'AUTH_REQUIRED');
    }

    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    if (typeof payload === 'object' && payload.userId) {
      req.userId = payload.userId;
    } else {
      throw new ApiError(401, 'Invalid token structure', 'INVALID_TOKEN');
    }

    next();
  },

  async ensureAccountActive(req, res, next) {
    const user = await userAuthRepository.findUserById(pool, req.userId);

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
  },
};
