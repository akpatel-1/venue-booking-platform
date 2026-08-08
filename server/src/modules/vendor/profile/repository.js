export async function findVendorProfileByUserId(client, id) {
  const result = await client.query(
    `
        SELECT vendor_name, phone, district, state, is_suspended, suspension_reason, approved_at
        FROM vendor_profiles
        WHERE user_id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}
