import { pool } from '../infrastructure/database/db.js';
import {
  consumeOtpToken,
  createOtpToken,
  createUser,
  findUser,
  markOtpsAsUsed,
} from '../models/user.auth.model.js';
import { generateOtp, generateOtpHash } from '../utils/otp.utils.js';
import { withTransaction } from '../utils/transactions.utils.js';
import { processOtpRequestEmail } from './email.services.js';

export async function processOtpRequest({ email }) {
  const { otp, hashedOtp } = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await withTransaction(pool, async (client) => {
    await markOtpsAsUsed(client, email);

    await createOtpToken(client, {
      email,
      otpHash: hashedOtp,
      expiresAt,
      usedAt: null,
    });
  });
  try {
    await processOtpRequestEmail(email, otp);
  } catch (err) {
    await markOtpsAsUsed(pool, email);
    throw err;
  }
}

export async function processOtpVerification({ email, otp }) {
  return withTransaction(pool, async (client) => {
    await verifyOtpHash(client, email, otp);
    const userId = await findOrCreateUser(client, email);
  });
}

async function verifyOtpHash(client, email, otp) {
  const otpHash = generateOtpHash(otp);
  const record = await consumeOtpToken(client, { email, otpHash });
  if (!record) throw new ApiError(400, 'Invalid or expired OTP');
}

async function findOrCreateUser(client, email) {
  const existingId = await findUser(client, email);
  if (existingId) return existingId;

  const userId = await createUser(client, email);

  await createAuthMethods(client, {
    userId,
    authProvider: 'otp',
    providerIdentifier: email,
  });

  return userId;
}
