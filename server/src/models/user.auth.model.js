export async function findUserByEmail(client, { email }) {
  const result = await client.query(
    `SELECT id, email FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0] ?? null;
}

export async function createUser(client, { email }) {
  const result = await client.query(
    `INSERT INTO users (email)
     VALUES ($1)
     RETURNING id`,
    [email]
  );
  return result.rows[0].id;
}

export async function createAuthMethod(client, data) {
  await client.query(
    `INSERT INTO user_auth_methods
     (user_id, auth_provider, provider_identifier, password_hash, verified_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      data.userId,
      data.authProvider,
      data.providerIdentifier,
      data.passwordHash,
      data.verifiedAt,
    ]
  );
}

export async function createRefreshToken(client, data) {
  await client.query(
    `INSERT INTO refresh_tokens 
    (user_id, token_hash, expires_at, revoked_at) 
    VALUES ($1, $2, $3, $4)`,
    [data.userId, data.tokenHash, data.expiresAt, data.revokedAt]
  );
}

export async function createEmailVerificationToken(client, data) {
  await client.query(
    `INSERT INTO email_verification_tokens
     (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [data.userId, data.tokenHash, data.expiresAt]
  );
}

export async function consumeVerificationToken(client, { tokenHash }) {
  const result = await client.query(
    `UPDATE email_verification_tokens
     SET used_at = NOW() 
     WHERE token_hash = $1 
     AND expires_at > NOW() 
     AND used_at IS NULL 
     RETURNING user_id`,
    [tokenHash]
  );
  return result.rows[0]?.user_id ?? null;
}

export async function markEmailAsVerified(client, { userId }) {
  await client.query(
    `UPDATE user_auth_methods
     SET verified_at = NOW()
     WHERE user_id = $1
     AND auth_provider = 'password'`,
    [userId]
  );
}

export async function getUserVerification(client, { userId }) {
  const result = await client.query(
    `SELECT verified_at FROM
     user_auth_methods
     WHERE user_id = $1 
     AND auth_provider = 'password'`,
    [userId]
  );
  return result.rows[0]?.verified_at ?? null;
}

export async function getUserById(client, { userId }) {
  const result = await client.query(
    `SELECT id, email FROM users
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function revokeRefreshToken(client, { tokenHash }) {
  const result = await client.query(
    `UPDATE refresh_tokens 
    SET revoked_at = NOW()
    WHERE token_hash = $1
    AND expires_at > NOW()
    AND revoked_at IS NULL
    RETURNING user_id`,
    [tokenHash]
  );
  return result.rows[0]?.user_id ?? null;
}
