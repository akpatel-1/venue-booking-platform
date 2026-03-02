import { getSessionData } from '../../infrastructure/redis/admin.redis.session.js';
import { ApiError } from '../../utils/api.error.util.js';

export async function sessionValidation(req, res, next) {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const session = await getSessionData(sessionId);

  if (!session) {
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    throw new ApiError(401, 'Session expired. Please log in again.');
  }

  if (session.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: Admin access required');
  }

  req.admin = {
    id: session.adminId,
    role: session.role,
  };

  next();
}
