import { pool } from '../../../../infrastructure/database/db.js';

export async function fetchVenue(vendorId, venueId) {
  const result = await pool.query(
    `SELECT id, name, description, category, address, district, state, pincode, geo_loc, cover_image_id, images, booking_type, opening_time, closing_time, status, suspension_reason, created_at, updated_at FROM venues WHERE id = $1 AND vendor_id = $2`,
    [venueId, vendorId]
  );
  return result.rows[0] ?? null;
}

export async function fetchReverificationApplication(venueId) {
  const result = await pool.query(
    `SELECT id, category, address, district, state, pincode, geo_loc,
            status, rejection_reason, submitted_at, reviewed_at
     FROM venue_reverifications
     WHERE venue_id = $1
       AND status IN ('pending', 'rejected')
     ORDER BY submitted_at DESC
     LIMIT 1`,
    [venueId]
  );

  return result.rows[0] ?? null;
}

export async function getCoverImage(vendorId, venueId) {
  const result = await pool.query(
    `
    SELECT has_cover_image
    FROM venues
    WHERE id = $1 AND vendor_id = $2
    `,
    [venueId, vendorId]
  );

  return result.rows[0] ?? null;
}

export async function updateCoverImage(vendorId, venueId) {
  await pool.query(
    `UPDATE venues  SET has_cover_image = TRUE WHERE id = $1 AND vendor_id = $2`,
    [venueId, vendorId]
  );
}
