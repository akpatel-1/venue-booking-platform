import jwt from 'jsonwebtoken';

import { ApiError } from '../utils/api.error.utils.js';

export async function requireAuth(req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
}
