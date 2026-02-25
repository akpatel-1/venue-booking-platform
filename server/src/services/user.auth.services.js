import { pool } from '../infrastructure/database/db.js';
import { createOtpToken, markOtpsAsUsed } from '../models/user.auth.model.js';
import { generateOtp } from '../utils/otp.utils.js';
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
