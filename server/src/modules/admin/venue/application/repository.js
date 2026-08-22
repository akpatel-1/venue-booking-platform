import { pool } from '../../../../infrastructure/database/db.js';

export async function fetchApplications(status) {
  const result = await pool.query(
    `
  SELECT id, vendor_id, name, venue_details, category, address, district, state, pincode, geo_loc, images, proof_document_key, rejection_reason, submitted_at
  FROM venue_applications
  WHERE status = $1
  ORDER BY submitted_at DESC`,
    [status]
  );
  return result.rows;
}

export async function markVenueAsRejected(reviewed_by, data) {
  const result = await pool.query(
    `UPDATE venue_applications SET status = $1, rejection_reason = $2, reviewed_at = NOW(), reviewed_by = $3 WHERE id = $4 AND status = 'pending' RETURNING id`,
    [data.status, data.rejection_reason, reviewed_by, data.id]
  );
  return result.rows[0] ?? null;
}

export async function markVenueAsApproved(client, reviewed_by, data) {
  const result = await client.query(
    `UPDATE venue_applications 
    SET status = $1, reviewed_at = NOW(), reviewed_by = $2
    WHERE id = $3 AND status = 'pending' 
    RETURNING id, vendor_id, name, category, address, district, state, pincode, geo_loc`,
    [data.status, reviewed_by, data.id]
  );
  return result.rows[0] ?? null;
}

export async function createVenue(client, data) {
  const result = await client.query(
    `INSERT INTO venues(vendor_id, application_id, name, category, address, district, state, pincode, geo_loc)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [
      data.vendor_id,
      data.id,
      data.name,
      data.category,
      data.address,
      data.district,
      data.state,
      data.pincode,
      data.geo_loc,
    ]
  );
  return result.rows[0];
}
