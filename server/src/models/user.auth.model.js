export async function createUser(client, data) {
  const result = await client.query(
    `INSERT INTO users (email)
     VALUES ($1)
     RETURNING id`,
    [data.email]
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

export async function createEmailVerificationToken(client, data) {
  await client.query(
    `INSERT INTO email_verification_tokens
     (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [data.userId, data.tokenHash, data.expiresAt]
  );
}

export async function findValidVerificationTokenByHash(client, data) {
  const result = await client.query(
    `UPDATE email_verification_tokens
     SET used_at = NOW() 
     WHERE token_hash = $1 
     AND expires_at > NOW() 
     AND used_at IS NULL 
     RETURNING user_id`,
    [data.tokenHash]
  );
  return result.rows[0]?.user_id ?? null;
}

export async function markEmailAsVerified(client, data) {
  await client.query(
    `UPDATE user_auth_methods
     SET verified_at = NOW()
     WHERE user_id = $1
     AND auth_provider = 'password'`,
    [data.userId]
  );
}
