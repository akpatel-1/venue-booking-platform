import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { ADMIN_AUTH_CONFIG } from '../auth/admin.auth.config.js';
import { repository } from './admin.session.repository.js';

export async function sessionValidation(req, res, next) {
  const sessionId = req.cookies[ADMIN_AUTH_CONFIG.COOKIE_NAME];

  if (!sessionId) {
    throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
  }

  const data = await repository.get(sessionId);

  if (!data) {
    res.clearCookie(
      ADMIN_AUTH_CONFIG.COOKIE_NAME,
      ADMIN_AUTH_CONFIG.CLEAR_COOKIE_OPTIONS
    );
    throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
  }

  req.admin = {
    id: data.adminId,
  };

  next();
}
