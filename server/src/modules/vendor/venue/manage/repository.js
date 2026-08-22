import { pool } from '../../../../infrastructure/database/db.js';

export async function fetchVenue(vendor_id, venue_id) {
  const result = await pool.query(
    `SELECT id, name, description, category, address, district, state, pincode, geo_loc, cover_image_key, images, booking_type, opening_time, closing_time, status, suspension_reason, created_at, updated_at FROM venues WHERE id = $1 AND vendor_id = $2`,
    [venue_id, vendor_id]
  );
  return result.rows[0] ?? null;
}
