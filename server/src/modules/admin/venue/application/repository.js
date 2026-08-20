import { pool } from '../../../../infrastructure/database/db.js';

export async function fetchApplications(status) {
  const result = await pool.query(
    `
  SELECT id, vendor_id, name, venue_details, category, address, district,state, pincode, geo_loc, images, proof_document_key, rejection_reason, submitted_at
  FROM venue_applications
  WHERE status = $1
  ORDER BY submitted_at DESC`,
    [status]
  );
  return result.rows;
}
