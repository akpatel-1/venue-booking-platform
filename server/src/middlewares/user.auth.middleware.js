import jwt from 'jsonwebtoken';

import { apiError } from '../utils/api.error.utils.js';

export async function requireAuth(req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new apiError(401, 'Unauthorized request');
  }

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    throw new apiError(401, 'Invalid or expired token');
  }
}
