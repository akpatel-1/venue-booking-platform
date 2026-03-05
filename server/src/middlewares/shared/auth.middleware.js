import jwt from 'jsonwebtoken';

import { ApiError } from '../../utils/api.error.util.js';

export async function requireAuth(req, res, next) {
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
}
