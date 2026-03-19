export const applicationRepository = {
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
};
