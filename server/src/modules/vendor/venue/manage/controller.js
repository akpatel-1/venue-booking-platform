import { getVenueDetails, uploadCoverImage } from './service.js';

export async function getVenue(req, res) {
  const data = await getVenueDetails(req.vendor.id, req.params.id);
  res.status(200).json({
    success: true,
    data: data,
  });
}

export async function uploadImage(req, res) {
  await uploadCoverImage(req.vendor.id, req.params.id, req.file);
  res
    .status(201)
    .json({ success: true, message: 'Cover image uploaded sucessfully' });
}
