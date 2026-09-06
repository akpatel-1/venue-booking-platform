import { pool } from '../../../../infrastructure/database/db.js';

export async function getVenues() {
  const result = await pool.query(`
        SELECT v.id, v.vendor_id, v.name, v.category, v.district, v.state, v.booking_type, v.opening_time, v.closing_time, MIN(vp.price) AS starting_price 
        FROM venues v
        JOIN venue_pricing vp ON vp.venue_id = v.id
        WHERE v.status = 'live'
        GROUP BY v.id, v.vendor_id, v.name, v.category, v.district, v.state, v.booking_type, v.opening_time, v.closing_time
    `);
  return result.rows;
}

export async function getVenue(venueId) {
  const result = await pool.query(
    `
  SELECT
  v.id,
  v.vendor_id,
  v.name,
  v.description,
  v.category,
  v.district,
  v.state,
  v.booking_type,
  v.opening_time,
  v.closing_time,
  v.images,
  vp.starting_price

FROM venues v

JOIN (
  SELECT
    venue_id,
    MIN(price) AS starting_price
  FROM venue_pricing
  GROUP BY venue_id
) vp ON vp.venue_id = v.id

WHERE v.id = $1 AND v.status = 'live'`,
    [venueId]
  );
  return result.rows[0];
}
