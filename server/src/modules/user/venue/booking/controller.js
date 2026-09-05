import * as service from '../booking/service.js';

export async function getVenues(req, res) {
  const data = await service.getVenues();
  res.status(200).json({
    success: true,
    message: 'Live venues fetched successfully',
    data,
  });
}

export async function getVenue(req, res) {
  const data = await service.getVenue(req.params.venueId);
  res.status(200).json({
    success: true,
    message: 'Venue details fetched successfully',
    data,
  });
}
