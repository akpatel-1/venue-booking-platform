export const applicationRepository = {
  async getVendorApplication(client, status) {
    const result = await client.query(
      `SELECT 
        pan_name, 
        phone, 
        address,
        pincode, 
        city, 
        state, 
        pan_number, 
        pan_document_url,
        submitted_at
      FROM vendor_applications
      WHERE status = $1
      ORDER BY submitted_at DESC`,
      [status]
    );
    return result.rows;
  },
};
