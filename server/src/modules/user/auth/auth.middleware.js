import jwt from 'jsonwebtoken';

import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { USER_AUTH_CONFIG } from './auth.config.js';
import { repository } from './auth.repository.js';

export const middleware = {
  async authenticateToken(req, res, next) {
    const accessToken = req.cookies[USER_AUTH_CONFIG.ACCESS_COOKIE];

    if (!accessToken) {
      throw new ApiError(USER_ERROR_CONFIG.ACCESS_TOKEN_MISSING);
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
    const user = await repository.findUserById(pool, req.userId);

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
