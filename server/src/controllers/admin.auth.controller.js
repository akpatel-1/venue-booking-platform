import 'dotenv/config';

import {
  createRedisSession,
  deleteSessionData,
} from '../infrastructure/admin.redis.session.js';
import { authenticateAdmin } from '../services/admin.auth.services.js';

export async function adminLogin(req, res) {
  const { sessionId: oldSession } = req.cookies;

  if (oldSession) {
    await deleteSessionData(oldSession);
  }

  const admin = await authenticateAdmin(req.body);
  const sessionId = await createRedisSession(admin.id);

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      id: admin.id,
      email: admin.email,
    },
  });
}

export async function adminLogout(req, res) {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await deleteSessionData(sessionId);
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}
