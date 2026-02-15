import { pool } from "../infrastructure/database/db.js";
import { hashPassword } from "../utils/password.utils.js";
import { generateEmailVerificationToken } from "../utils/token.utils.js";
import {
  createUser,
  createAuthMethod,
  insertEmailVerificationToken,
} from "../models/user.auth.model.js";
import { sendVerificationEmail } from "./email.services.js";

export async function registerEmailUser({ email, password }) {
  const client = await pool.connect();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  try {
    const passwordHash = await hashPassword(password);
    const hashedToken = generateEmailVerificationToken();

    await client.query("BEGIN");

    const userId = await createUser(client, email);

    await createAuthMethod(client, {
      userId,
      authProvider: "password",
      providerIdentifier: email,
      passwordHash,
      verifiedAt: null,
    });

    await insertEmailVerificationToken(client, {
      userId,
      tokenHash: hashedToken,
      expiresAt,
    });

    await client.query("COMMIT");

    return userId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
