import crypto from 'crypto';

import { redis } from './redis.js';

export async function createAdminSession(adminId, role = 'admin') {
  const SESSION_TTL = 60 * 60 * 24;
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;
  const sessionData = {
    adminId,
    role,
    createdAt: Date.now(),
  };
  await redis.set(sessionKey, sessionData, {
    ex: SESSION_TTL,
  });
  return sessionId;
}

export async function getSessionData(sessionId) {
  return redis.get(`session:${sessionId}`);
}

export async function deleteAdminSession(sessionId) {
  return redis.del(`session:${sessionId}`);
}
