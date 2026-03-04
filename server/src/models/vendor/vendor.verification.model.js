export async function findUserById(client, userId) {
  const result = await client.query(
    `SELECT role, status
     FROM users 
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function findVerifiedVendorProfileByUserId(client, userId) {
  const result = await client.query(
    `SELECT is_suspended, suspension_reason
    FROM vendor_profiles
    WHERE user_id = $1
    AND is_verified = true`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function findLatestVendorApplicationByUserId(client, userId) {
  const result = await client.query(
    `SELECT status, rejection_reason
      FROM vendor_applications
      WHERE user_id = $1
      ORDER BY submitted_at DESC
      LIMIT 1`,
    [userId]
  );
  return result.rows[0] ?? null;
}
