import {
  getVenueDetails,
  updateVenueDetails,
  updateVenueHours,
  uploadCoverImage,
  uploadVenueImages,
} from './service.js';

export async function getVenue(req, res) {
  const data = await getVenueDetails(req.vendor.id, req.params.venueId);
  res.status(200).json({
    success: true,
    data: data,
  });
}

export async function uploadImage(req, res) {
  await uploadCoverImage(req.vendor.id, req.params.venueId, req.file);
  res
    .status(201)
    .json({ success: true, message: 'Cover image uploaded sucessfully' });
}

export async function uploadImages(req, res) {
  const data = {
    vendorId: req.vendor.id,
    venueId: req.params.venueId,
    ...req.body,
    files: req.files,
  };
  await uploadVenueImages(data);
  res
    .status(201)
    .json({ success: true, message: 'Venue images edited sucessfully' });
}

export async function updateVenue(req, res) {
  const data = await updateVenueDetails(
    req.vendor.id,
    req.params.venueId,
    req.body
  );
  res.status(201).json({
    success: true,
    message: 'Venue changes submitted for re-verification',
    data,
  });
}

export async function updateHours(req, res, next) {
  await updateVenueHours(req.vendor.id, req.params.venueId, req.body);

  res.status(201).json({
    success: true,
    message: 'Venue hours updated successfully',
  });
}
