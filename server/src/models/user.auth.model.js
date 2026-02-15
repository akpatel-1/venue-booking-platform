export async function createUser(client, email) {
  const result = await client.query(
    `INSERT INTO users (email)
     VALUES ($1)
     RETURNING id`,
    [email],
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
    ],
  );
}

export async function insertEmailVerificationToken(client, data) {
  await client.query(
    `INSERT INTO email_verification_tokens
     (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [data.userId, data.tokenHash, data.expiresAt],
  );
}
