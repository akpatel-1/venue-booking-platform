import 'dotenv/config';

import { login, logout } from '../services/admin.auth.services.js';

export async function adminLogin(req, res) {
  const { sessionId: oldSession } = req.cookies;
  const { sessionId, admin } = await login(req.body, oldSession);

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: admin,
  });
}

export async function adminLogout(req, res) {
  const { sessionId } = req.cookies;

  await logout(sessionId);

  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}
