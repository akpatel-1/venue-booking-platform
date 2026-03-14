import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { processOtpRequestEmail } from './user.auth.email.service.js';
import { userAuthOtp } from './user.auth.otp.js';
import { userAuthRepository } from './user.auth.repository.js';
import { authTokens } from './user.auth.token.js';

export const userAuthService = {
  async processOtpRequest({ email }) {
    const { otp, hashedOtp } = userAuthOtp.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await withTransaction(pool, async (client) => {
      await userAuthRepository.markOtpsAsUsed(client, email);
      await userAuthRepository.createOtpToken(client, {
        email,
        otpHash: hashedOtp,
        expiresAt,
        usedAt: null,
      });
    });

    try {
      await processOtpRequestEmail(email, otp);
    } catch (err) {
      await userAuthRepository.markOtpsAsUsed(pool, email);
      throw err;
    }
  },

  async processOtpVerification({ email, otp }) {
    return withTransaction(pool, async (client) => {
      await this._verifyOtpHash(client, email, otp);
      const userId = await this._findOrCreateUser(client, email);
      const refreshToken = await this.createSession(client, userId);
      const accessToken = authTokens.generateAccesToken(userId);

      return { accessToken, refreshToken };
    });
  },

  async _verifyOtpHash(client, email, otp) {
    const otpHash = userAuthOtp.generateOtpHash(otp);
    const record = await userAuthRepository.consumeOtpToken(client, {
      email,
      otpHash,
    });

    if (!record) {
      throw new ApiError(
        400,
        'Invalid or expired OTP',
        'INVALID_OR_EXPIRED_OTP'
      );
    }
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
      throw new ApiError(
        401,
        'No active session. Please login again',
        'NO_ACTIVE_SESSION'
      );
    }

    const hashedRefreshToken =
      authTokens.authTokens.generateTokenHash(refreshToken);

    const { userId, rawToken } = await withTransaction(pool, async (client) => {
      const userId = await userAuthRepository.markRefreshTokenAsRevoked(
        client,
        {
          tokenHash: hashedRefreshToken,
        }
      );

      if (!userId) {
        throw new ApiError(401, 'Token expired, login again', 'TOKEN_EXPIRED');
      }

      const rawToken = await this.createSession(client, userId);
      return { userId, rawToken };
    });

    const accessToken = authTokens.generateAccesToken(userId);
    return { accessToken, refreshToken: rawToken };
  },

  async createSession(client, userId) {
    const { rawToken, hashedToken } = authTokens.generateAuthToken();

    await userAuthRepository.createRefreshToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      revokedAt: null,
    });

    return rawToken;
  },
};
