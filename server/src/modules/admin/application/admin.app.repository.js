export const repository = {
  async getVendorApplication(client, status) {
    const result = await client.query(
      `SELECT 
        id,
        pan_name, 
        phone, 
        address,
        pincode, 
        city, 
        state, 
        pan_number, 
        pan_document_url,
        status,
        submitted_at,
        rejection_reason,
        reviewed_at
      FROM vendor_applications
      WHERE status = $1
      ORDER BY submitted_at DESC`,
      [status]
    );
    return result.rows;
  },

  async markVendorAsApproved(client, data) {
    const result = await client.query(
      `UPDATE vendor_applications
      SET status = $1,
      reviewed_at = NOW(),
      reviewed_by = $2 
      WHERE id = $3
      RETURNING user_id, pan_name`,
      [data.status, data.reviewedBy, data.id]
    );
    return result.rows[0] ?? null;
  },

  async createVendorProfile(client, data) {
    const result = await client.query(
      `INSERT INTO vendor_profiles(user_id, vendor_name)
      VALUES ($1, $2)`,
      [data.user_id, data.pan_name]
    );
  },

  async markUserAsVendor(client, id) {
    await client.query(
      `
      UPDATE users 
      SET role = 'vendor'
      WHERE id = $1`,
      [id]
    );
  },

  async markVendorAsRejected(client, data) {
    await client.query(
      `
    UPDATE vendor_applications
    SET status = $1,
    rejection_reason = $2,
    reviewed_at = NOW(),
    reviewed_by = $3
    WHERE id = $4`,
      [data.status, data.rejectionReason, data.reviewedBy, data.id]
    );
  },

  async getStatusCount(client, status) {
    const result = await client.query(
      `SELECT COUNT(*) AS count
     FROM vendor_applications
     WHERE status = $1`,
      [status]
    );

    return Number(result.rows[0].count);
  },
};
