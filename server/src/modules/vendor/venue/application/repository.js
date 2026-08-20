export async function insertIntoVenueApplications(client, data) {
  const result = await client.query(
    `
      INSERT INTO venue_applications (
        vendor_id,
        name,
        venue_details,
        category,
        address,
        district,
        state,
        pincode,
        geo_loc,
        images,
        proof_document_key
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        ST_SetSRID(ST_MakePoint($10, $9), 4326)::geography,
        $11,
        $12
      )
      RETURNING id
    `,
    [
      data.vendor_id,
      data.name,
      data.venue_details,
      data.category,
      data.address,
      data.district,
      data.state,
      data.pincode,
      data.latitude,
      data.longitude,
      data.images,
      data.proof_document_key,
    ]
  );

  return result.rows[0].id;
}
