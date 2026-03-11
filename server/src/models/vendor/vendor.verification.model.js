export async function findUserById(client, userId) {
  const result = await client.query(
    `SELECT role, status
     FROM users 
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function findVerifiedProfileByUserId(client, userId) {
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
      ORDER BY submitted_at 
      DESC LIMIT 1`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function findLatestVendorApplicationStatusByUserId(
  client,
  userId
) {
  const result = await client.query(
    `SELECT status
    FROM vendor_applications
    WHERE user_id = $1
    ORDER BY submitted_at 
    DESC LIMIT 1`,
    [userId]
  );
  return result.rows[0]?.status ?? null;
}

export async function insertVendorApplication(client, data) {
  const result = await client.query({
    text: `INSERT INTO vendor_applications(user_id, business_name, venue_type, gst_number, phone, address, city, state, pincode, document_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           RETURNING id`,
    values: [
      data.userId,
      data.business_name,
      data.venue_type,
      data.gst_number,
      data.phone,
      data.address,
      data.city,
      data.state,
      data.pincode,
      data.documentUrl,
    ],
  });
  return result.rows[0];
}
