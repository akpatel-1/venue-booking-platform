import jwt from 'jsonwebtoken';

import { pool } from '../infrastructure/database/db.js';
import * as authModel from '../models/user.auth.model.js';
import { apiError } from '../utils/api.error.utils.js';
import { hashPassword } from '../utils/password.utils.js';
import { convertToHash, generateAuthTokens } from '../utils/token.utils.js';
import { withTransaction } from '../utils/transactions.utils.js';
import { sendEmailVerification } from './email.services.js';

export async function registerUserWithEmail({ email, password }) {
  const existing = await authModel.findUserByEmail(pool, { email });
  if (existing) {
    throw new apiError(409, 'Email already registered. Please login.');
  }

  const passwordHash = await hashPassword(password);
  const { rawToken, hashedToken } = generateAuthTokens();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const userId = await withTransaction(pool, async (client) => {
    const userId = await authModel.createUser(client, { email });

    await authModel.createAuthMethod(client, {
      userId,
      authProvider: 'password',
      providerIdentifier: email,
      passwordHash: passwordHash,
      verifiedAt: null,
    });

    await authModel.createEmailVerificationToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt,
    });

    return userId;
  });

  await sendEmailVerification(email, rawToken);

  return { userId, email };
}

export async function createSession(userId) {
  const { rawToken, hashedToken } = generateAuthTokens();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: '30m',
  });

  await authModel.createRefreshToken(pool, {
    userId,
    tokenHash: hashedToken,
    expiresAt,
    revokedAt: null,
  });

  return { accessToken, refreshToken: rawToken };
}

export async function verifyUserEmail(verificationToken) {
  const hashedToken = convertToHash(verificationToken);

  await withTransaction(pool, async (client) => {
    const userId = await authModel.consumeVerificationToken(client, {
      tokenHash: hashedToken,
    });
    if (!userId) {
      throw new apiError(401, 'Invalid or expired token');
    }
    await authModel.markEmailAsVerified(client, {
      userId,
    });
  });
}

export async function checkEmailVerified(userId) {
  const verifiedAt = await authModel.getUserVerification(pool, { userId });
  const user = await authModel.getUserById(pool, { userId });

  if (!user) {
    throw new apiError(404, 'User not found');
  }

  return {
    id: user.id,
    email: user.email,
    verified: !!verifiedAt,
  };
}

export async function rotateSession(refreshToken) {
  const hashedRefreshToken = convertToHash(refreshToken);

  const { userId, rawToken } = await withTransaction(pool, async (client) => {
    const userId = await authModel.revokeRefreshToken(client, {
      tokenHash: hashedRefreshToken,
    });
    if (!userId) {
      throw new Error('Token expired, login again');
    }
    const { rawToken, hashedToken } = generateAuthTokens();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await authModel.createRefreshToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt,
      revokedAt: null,
    });
    return { userId, rawToken };
  });
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: '30m',
  });
  return { accessToken, refreshToken: rawToken };
}
