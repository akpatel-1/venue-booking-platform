import { pool } from '../infrastructure/database/db.js';
import {
  createAuthMethod,
  createEmailVerificationToken,
  createUser,
  findValidVerificationTokenByHash,
  markEmailAsVerified,
} from '../models/user.auth.model.js';
import { apiError } from '../utils/api.error.utils.js';
import { hashPassword } from '../utils/password.utils.js';
import { convertToHash, generateAuthTokens } from '../utils/token.utils.js';
import { sendEmailVerification } from './email.services.js';

export async function registerUserWithEmail({ email, password }) {
  const hashedPassword = await hashPassword(password);
  const expireIn = new Date(Date.now() + 10 * 60 * 1000);
  const { rawToken: rawEmailToken, hashedToken: hashedEmailToken } =
    generateAuthTokens();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const id = await createUser(client, { email });

    await createAuthMethod(client, {
      userId: id,
      authProvider: 'password',
      providerIdentifier: email,
      passwordHash: hashedPassword,
      verifiedAt: null,
    });

    await createEmailVerificationToken(client, {
      userId: id,
      tokenHash: hashedEmailToken,
      expiresAt: expireIn,
    });

    await client.query('COMMIT');

    await sendEmailVerification(email, rawEmailToken);

    return email;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function verifyUserEmail(token) {
  const client = await pool.connect();

  try {
    const hashedToken = convertToHash(token);

    await client.query('BEGIN');

    const userId = await findValidVerificationTokenByHash(client, {
      tokenHash: hashedToken,
    });

    if (!userId) {
      throw new apiError(401, 'Invalid or expired token');
    }

    await markEmailAsVerified(client, {
      userId,
    });

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
