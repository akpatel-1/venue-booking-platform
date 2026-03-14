import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import {
  ADMIN_AUTH_CONFIG,
  ADMIN_AUTH_ERRORS,
} from '../auth/admin.auth.config.js';
import { sessionRepository } from './admin.session.repository.js';

export async function sessionValidation(req, res, next) {
  const sessionId = req.cookies[ADMIN_AUTH_CONFIG.COOKIE_NAME];

  if (!sessionId) {
    throw new ApiError(
      401,
      'Unauthorized request',
      ERROR_CONFIG.UNAUTHORIZED_REQUEST
    );
  }

  const session = await sessionRepository.get(sessionId);

  if (!session) {
    res.clearCookie(
      ADMIN_AUTH_CONFIG.COOKIE_NAME,
      ADMIN_AUTH_CONFIG.CLEAR_COOKIE_OPTIONS
    );
    throw new ApiError(
      401,
      'Session expired. Please log in again.',
      ERROR_CONFIG.SESSION_EXPIRED
    );
  }

  if (session.role !== 'admin') {
    throw new ApiError(
      403,
      'Forbidden: Admin access required',
      ADMIN_AUTH_ERRORS.ADMIN_ACCESS_REQUIRED
    );
  }

  req.admin = {
    id: session.adminId,
    role: session.role,
  };

  next();
}
