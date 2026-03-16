export const vendorApplicationRepository = {
  async findLatestVendorApplicationByUserId(client, userId) {
    const result = await client.query(
      `SELECT status, rejection_reason
      FROM vendor_kyc_applications
      WHERE user_id = $1
      ORDER BY submitted_at 
      DESC LIMIT 1`,
      [userId]
    );
    return result.rows[0] ?? null;
  },

  async findLatestVendorApplicationStatusByUserId(client, userId) {
    const result = await client.query(
      `SELECT status
    FROM vendor_kyc_applications
    WHERE user_id = $1
    ORDER BY submitted_at 
    DESC LIMIT 1`,
      [userId]
    );
    return result.rows[0]?.status ?? null;
  },

  async insertVendorApplication(client, data) {
    const result = await client.query({
      text: `INSERT INTO vendor_kyc_applications
           (user_id, pan_name, phone, address, pincode, city, state, pan_number, pan_document_url)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
           RETURNING id`,
      values: [
        data.userId,
        data.pan_name,
        data.phone,
        data.address,
        data.pincode,
        data.city,
        data.state,
        data.pan_number,
        data.documentUrl,
      ],
    });

    return result.rows[0];
  },
};
