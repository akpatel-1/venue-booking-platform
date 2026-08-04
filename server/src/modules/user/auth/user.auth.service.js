import { ERROR_CONFIG } from '../../../config/error.config.js';
import { pool } from '../../../infrastructure/database/db.js';
import ApiError from '../../../utils/api.error.util.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { USER_ERROR_CONFIG } from '../user.error.config.js';
import sendOtpEmail from './user.auth.email.service.js';
import { generateOtpPair, verifyOtp } from './user.auth.otp.js';
import {
  checkCoolDown,
  checkRateLimit,
  deleteOtp,
  getOtp,
  storeOtp,
} from './user.auth.otp.repository.js';
import {
  createAuthMethod,
  createRefreshToken,
  createUser,
  findUser,
  markRefreshTokenAsRevoked,
} from './user.auth.repository.js';
import {
  generateAccessToken,
  generateAuthToken,
  generateHash,
} from './user.auth.token.js';

export async function processOtpRequest({ email }) {
  await checkCoolDown(email);
  await checkRateLimit(email);
  const { otp, hashedOtp } = generateOtpPair();
  await storeOtp(email, hashedOtp);

  try {
    await sendOtpEmail(email, otp);
  } catch (err) {
    await deleteOtp(email);
    throw err;
  }
}

export async function processOtpVerification({ email, otp }) {
  await verifyOtpHash(email, otp);
  const authTokens = await withTransaction(pool, async (client) => {
    const userId = await findOrCreateUser(client, email);
    const refreshToken = await createRefreshSession(client, userId);
    const accessToken = generateAccessToken(userId);
    return { accessToken, refreshToken };
  });
  await deleteOtp(email);
  return authTokens;
}

async function verifyOtpHash(email, otp) {
  const otpRecord = await getOtp(email);

  if (!otpRecord || !verifyOtp(otp, otpRecord.hashedOtp)) {
    throw new ApiError(USER_ERROR_CONFIG.INVALID_OR_EXPIRED_OTP);
  }
}

async function findOrCreateUser(client, email) {
  const existingId = await findUser(client, email);
  if (existingId) return existingId;

  const userId = await createUser(client, email);

  await createAuthMethod(client, {
    userId,
    authProvider: 'otp',
    providerIdentifier: email,
  });

  return userId;
}

export async function rotateRefreshToken(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
  }

  const hashedRefreshToken = generateHash(refreshToken);

  const { userId, rawToken } = await withTransaction(pool, async (client) => {
    const userId = await markRefreshTokenAsRevoked(client, hashedRefreshToken);

    if (!userId) {
      throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
    }

    const rawToken = await createRefreshSession(client, userId);
    return { userId, rawToken };
  });

  const accessToken = generateAccessToken(userId);
  return { accessToken, refreshToken: rawToken };
}

async function createRefreshSession(client, userId) {
  const { rawToken, hashedToken } = generateAuthToken();

  await createRefreshToken(client, {
    userId,
    tokenHash: hashedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    revokedAt: null,
  });

  return rawToken;
}

export async function processLogout(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(ERROR_CONFIG.SESSION_EXPIRED);
  }
  const hashedRefreshToken = generateHash(refreshToken);

  await markRefreshTokenAsRevoked(pool, hashedRefreshToken);
}
