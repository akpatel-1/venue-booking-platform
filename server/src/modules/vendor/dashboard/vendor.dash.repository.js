export const repository = {
  async getVendorProfileByUserId(client, id) {
    const result = await client.query(
      `
        SELECT vendor_name, phone, district, state, is_suspended, suspension_reason, created_at
        FROM vendor_profiles
        WHERE user_id = $1`,
      [id]
    );
    return result.rows[0];
  },
};
