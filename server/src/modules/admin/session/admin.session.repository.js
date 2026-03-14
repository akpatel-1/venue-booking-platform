import crypto from 'crypto';

import { redis } from '../../../infrastructure/redis/redis.js';
import { ADMIN_AUTH_CONFIG } from '../auth/admin.auth.config.js';

export const sessionRepository = {
  async create(adminId) {
    const sessionId = crypto.randomUUID();
    const key = `${ADMIN_AUTH_CONFIG.SESSION_PREFIX}${sessionId}`;

    const sessionData = {
      adminId,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    await redis.set(key, sessionData, { ex: ADMIN_AUTH_CONFIG.SESSION_TTL });

    return sessionId;
  },

  async get(sessionId) {
    if (!sessionId) return null;
    const key = `${ADMIN_AUTH_CONFIG.SESSION_PREFIX}${sessionId}`;
    return await redis.get(key);
  },

  async delete(sessionId) {
    if (!sessionId) return;
    const key = `${ADMIN_AUTH_CONFIG.SESSION_PREFIX}${sessionId}`;
    await redis.del(key);
  },
};
