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
