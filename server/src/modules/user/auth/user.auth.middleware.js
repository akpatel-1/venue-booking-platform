import jwt from 'jsonwebtoken';

import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { userAuthRepository } from './user.auth.repository.js';

export const middleware = {
  async authenticateToken(req, res, next) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new ApiError(ERROR_CONFIG.UNAUTHORIZED_REQUEST);
    }

    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    if (typeof payload === 'object' && payload.userId) {
      req.userId = payload.userId;
    } else {
      throw new ApiError(USER_ERROR_CONFIG.INVALID_TOKEN);
    }

    next();
  },

  async ensureAccountActive(req, res, next) {
    const user = await userAuthRepository.findUserById(pool, req.userId);

    if (!user) {
      throw new ApiError(USER_ERROR_CONFIG.USER_NOT_FOUND);
    }

    if (user.status === 'banned') {
      throw new ApiError(USER_ERROR_CONFIG.ACCOUNT_DEACTIVATED);
    }
    req.user = user;
    next();
  },
};
