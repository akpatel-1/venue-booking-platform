import { getVenueDetails } from './service.js';

export async function getVenue(req, res) {
  const data = await getVenueDetails(req.vendor.id, req.params.id);
  res.status(200).json({
    success: true,
    data: data,
  });
}
