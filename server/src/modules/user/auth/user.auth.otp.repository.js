import { redis } from '../../../infrastructure/redis/redis.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { USER_AUTH_CONFIG } from './user.auth.config.js';

export const userAuthOtpRepository = {
  async checkRateLimit(hashedEmail) {
    const key = `${USER_AUTH_CONFIG.OTP_RATE_LIMIT_PREFIX}${hashedEmail}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, USER_AUTH_CONFIG.OTP_RATE_LIMIT_TTL);
    }

    if (count > USER_AUTH_CONFIG.OTP_MAX_REQUESTS) {
      throw new ApiError(USER_ERROR_CONFIG.OTP_RATE_LIMIT_EXCEEDED);
    }
  },
  async checkCoolDown(hashedEmail) {
    const key = `${USER_AUTH_CONFIG.OTP_COOLDOWN_PREFIX}${hashedEmail}`;

    const exists = await redis.get(key);

    if (exists) {
      const ttl = await redis.ttl(key);
      throw new ApiError({
        statusCode: 429,
        message: `Please wait ${ttl} seconds before requesting another OTP`,
        code: 'OTP_REQUEST_LIMIT',
      });
    }

    await redis.set(key, '1', { ex: USER_AUTH_CONFIG.OTP_COOLDOWN_TTL });
  },

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
