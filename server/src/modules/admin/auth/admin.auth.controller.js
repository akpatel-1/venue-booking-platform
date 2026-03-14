import { ADMIN_AUTH_CONFIG } from './admin.auth.config.js';
import { loginAdmin, logoutAdmin } from './admin.auth.service.js';

export async function handleAdminLogin(req, res) {
  const oldSessionId = req.cookies[ADMIN_AUTH_CONFIG.COOKIE_NAME];
  const credentials = req.data();

  const { sessionId, admin } = await loginAdmin(credentials, oldSessionId);

  res.cookie(
    ADMIN_AUTH_CONFIG.COOKIE_NAME,
    sessionId,
    ADMIN_AUTH_CONFIG.COOKIE_OPTIONS
  );

  return res.status(200).json({
    message: 'Login successful',
    data: admin,
  });
}

export async function handleAdminLogout(req, res) {
  const sessionId = req.cookies[ADMIN_AUTH_CONFIG.COOKIE_NAME];

  await logoutAdmin(sessionId);

  res.clearCookie(
    ADMIN_AUTH_CONFIG.COOKIE_NAME,
    ADMIN_AUTH_CONFIG.CLEAR_COOKIE_OPTIONS
  );

  return res.status(200).json({
    message: 'Logged out successfully',
  });
}
