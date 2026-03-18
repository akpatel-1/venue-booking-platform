import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import { processOtpRequestEmail } from './user.auth.email.service.js';
import { userAuthOtp } from './user.auth.otp.js';
import { userAuthOtpRepository } from './user.auth.otp.repository.js';
import { userAuthRepository } from './user.auth.repository.js';
import { userAuthToken } from './user.auth.token.js';

export const userAuthService = {
  async processOtpRequest({ email }) {
    const hashedEmail = userAuthToken.generateHash(email);
    await userAuthOtpRepository.checkCoolDown(hashedEmail);
    await userAuthOtpRepository.checkRateLimit(hashedEmail);
    const { otp, hashedOtp } = userAuthOtp.generateOtp();
    await userAuthOtpRepository.create(hashedEmail, hashedOtp);

    try {
      await processOtpRequestEmail(email, otp);
    } catch (err) {
      await userAuthOtpRepository.delete(hashedEmail);
      throw err;
    }
  },

  async processOtpVerification({ email, otp }) {
    return withTransaction(pool, async (client) => {
      await this._verifyOtpHash(email, otp);

      const userId = await this._findOrCreateUser(client, email);
      const refreshToken = await this.createSession(client, userId);
      const accessToken = userAuthToken.generateAccessToken(userId);

      return { accessToken, refreshToken };
    });
  },

  async _verifyOtpHash(email, otp) {
    const hashedEmail = userAuthToken.generateHash(email);
    const otpRecord = await userAuthOtpRepository.get(hashedEmail);

    if (!otpRecord || !otpRecord.hashedOtp) {
      throw new ApiError(USER_ERROR_CONFIG.INVALID_OR_EXPIRED_OTP);
    }
    if (!userAuthOtp.verifyOtp(otp, otpRecord.hashedOtp)) {
      throw new ApiError(USER_ERROR_CONFIG.INVALID_OR_EXPIRED_OTP);
    }
    await userAuthOtpRepository.delete(hashedEmail);
  },

  async _findOrCreateUser(client, email) {
    const existingId = await userAuthRepository.findUser(client, email);
    if (existingId) return existingId;

    const userId = await userAuthRepository.createUser(client, email);

    await userAuthRepository.createAuthMethods(client, {
      userId,
      authProvider: 'otp',
      providerIdentifier: email,
    });

    return userId;
  },

  async processSessionRotation({ refreshToken }) {
    if (!refreshToken) {
      throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
    }

    const hashedRefreshToken = userAuthToken.generateHash(refreshToken);

    const { userId, rawToken } = await withTransaction(pool, async (client) => {
      const userId = await userAuthRepository.markRefreshTokenAsRevoked(
        client,
        {
          tokenHash: hashedRefreshToken,
        }
      );

      if (!userId) {
        throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
      }

      const rawToken = await this.createSession(client, userId);
      return { userId, rawToken };
    });

    const accessToken = userAuthToken.generateAccessToken(userId);
    return { accessToken, refreshToken: rawToken };
  },

  async createSession(client, userId) {
    const { rawToken, hashedToken } = userAuthToken.generateAuthToken();

    await userAuthRepository.createRefreshToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      revokedAt: null,
    });

    return rawToken;
  },
};
