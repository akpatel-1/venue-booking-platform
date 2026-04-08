import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { sendOtpEmail } from './user.auth.email.service.js';
import { OTP } from './user.auth.otp.js';
import { otpRepository } from './user.auth.otp.repository.js';
import { repository } from './user.auth.repository.js';
import { token } from './user.auth.token.js';

export const service = {
  async processOtpRequest({ email }) {
    const hashedEmail = token.generateHash(email);
    await otpRepository.checkCoolDown(hashedEmail);
    await otpRepository.checkRateLimit(hashedEmail);
    const { otp, hashedOtp } = OTP.generateOtp();
    await otpRepository.create(hashedEmail, hashedOtp);

    try {
      await sendOtpEmail(email, otp);
    } catch (err) {
      await otpRepository.delete(hashedEmail);
      throw err;
    }
  },

  async processOtpVerification({ email, otp }) {
    return withTransaction(pool, async (client) => {
      await this._verifyOtpHash(email, otp);

      const userId = await this._findOrCreateUser(client, email);
      const refreshToken = await this.createSession(client, userId);
      const accessToken = token.generateAccessToken(userId);

      return { accessToken, refreshToken };
    });
  },

  async _verifyOtpHash(email, otp) {
    const hashedEmail = token.generateHash(email);
    const otpRecord = await otpRepository.get(hashedEmail);

    if (!otpRecord || !otpRecord.hashedOtp) {
      throw new ApiError(USER_ERROR_CONFIG.INVALID_OR_EXPIRED_OTP);
    }
    if (!OTP.verifyOtp(otp, otpRecord.hashedOtp)) {
      throw new ApiError(USER_ERROR_CONFIG.INVALID_OR_EXPIRED_OTP);
    }
    await otpRepository.delete(hashedEmail);
  },

  async _findOrCreateUser(client, email) {
    const existingId = await repository.findUser(client, email);
    if (existingId) return existingId;

    const userId = await repository.createUser(client, email);

    await repository.createAuthMethods(client, {
      userId,
      authProvider: 'otp',
      providerIdentifier: email,
    });

    return userId;
  },

  async processSessionRotation(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
    }

    const hashedRefreshToken = token.generateHash(refreshToken);

    const { userId, rawToken } = await withTransaction(pool, async (client) => {
      const userId = await repository.markRefreshTokenAsRevoked(client, {
        tokenHash: hashedRefreshToken,
      });

      if (!userId) {
        throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
      }

      const rawToken = await this.createSession(client, userId);
      return { userId, rawToken };
    });

    const accessToken = token.generateAccessToken(userId);
    return { accessToken, refreshToken: rawToken };
  },

  async createSession(client, userId) {
    const { rawToken, hashedToken } = token.generateAuthToken();

    await repository.createRefreshToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      revokedAt: null,
    });

    return rawToken;
  },

  async processLogout(userId) {
    await repository.revokeRefreshToken(pool, userId);
  },
};
