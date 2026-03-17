import { redis } from '../../../infrastructure/redis/redis.js';
import { USER_AUTH_CONFIG } from './user.auth.config.js';

export const userAuthOtpRepository = {
  async create(hashedEmail, hashedOtp) {
    const key = `${USER_AUTH_CONFIG.OTP_PREFIX}${hashedEmail}`;

    await redis.set(key, { hashedOtp }, { ex: USER_AUTH_CONFIG.OTP_TTL });
  },

  async get(hashedEmail) {
    const key = `${USER_AUTH_CONFIG.OTP_PREFIX}${hashedEmail}`;
    return await redis.get(key);
  },

  async delete(hashedEmail) {
    const key = `${USER_AUTH_CONFIG.OTP_PREFIX}${hashedEmail}`;
    await redis.del(key);
  },
};
