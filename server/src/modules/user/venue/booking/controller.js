import * as service from '../booking/service.js';

export async function getVenues(req, res) {
  const data = await service.getVenues();
  res.status(200).json({
    success: true,
    message: 'Live venues fetched successfully',
    data,
  });
}
