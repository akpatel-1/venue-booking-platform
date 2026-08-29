import {
  getVenueDetails,
  updateVenueDetails,
  updateVenueHours,
  uploadCoverImage,
  uploadVenueImages,
} from './service.js';

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

export async function uploadImages(req, res) {
  const data = {
    vendorId: req.vendor.id,
    venueId: req.params.id,
    ...req.data,
    files: req.files,
  };
  await uploadVenueImages(data);
  res
    .status(201)
    .json({ success: true, message: 'Venue images edited sucessfully' });
}

export async function updateVenue(req, res) {
  console.log(req.data);
  const data = await updateVenueDetails(req.vendor.id, req.data);
  res.status(201).json({
    success: true,
    message: 'Venue changes submitted for re-verification',
    data,
  });
}

export async function updateHours(req, res, next) {
  await updateVenueHours(req.vendor.id, req.params.id, req.data);

  res.status(201).json({
    success: true,
    message: 'Venue hours updated successfully',
  });
}
