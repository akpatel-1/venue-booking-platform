export async function markOtpsAsUsed(client, email) {
  await client.query(
    `UPDATE otp_tokens
     SET used_at = now()
     WHERE email = $1
     AND used_at IS NULL`,
    [email]
  );
}

export async function createOtpToken(client, data) {
  await client.query(
    `INSERT INTO otp_tokens
      (email, otp_hash, expires_at, used_at)
      VALUES ($1, $2, $3, $4)`,
    [data.email, data.otpHash, data.expiresAt, data.usedAt]
  );
}

export async function consumeOtpToken(client, data) {
  const result = await client.query(
    `UPDATE otp_tokens 
     SET used_at = NOW()
     WHERE email = $1 
       AND otp_hash = $2
       AND expires_at > NOW()
       AND used_at IS NULL
     RETURNING id`,
    [data.email, data.otpHash]
  );
  return result.rows[0];
}

export async function findUser(client, email) {
  const result = await client.query(
    `SELECT id 
     FROM users 
     WHERE email = $1`,
    [email]
  );
  return result.rows[0]?.id ?? null;
}

export async function createUser(client, email) {
  const result = await client.query(
    `INSERT INTO users (email)
     VALUES ($1) 
     RETURNING id`,
    [email]
  );
  return result.rows[0].id;
}

export async function createAuthMethods(client, data) {
  await client.query(
    `INSERT INTO user_auth_methods
     (user_id, auth_provider, provider_identifier)
     VALUES ($1, $2, $3)`,
    [data.userId, data.authProvider, data.providerIdentifier]
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

export async function markRefreshTokenAsRevoked(client, { tokenHash }) {
  const result = await client.query(
    `UPDATE refresh_tokens
    SET revoked_at = NOW()
    WHERE token_hash = $1
    RETURNING user_id`,
    [tokenHash]
  );
  return result.rows[0]?.user_id ?? null;
}
