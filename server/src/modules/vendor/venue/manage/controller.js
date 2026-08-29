import * as service from './service.js';

export async function getVenueDetails(req, res) {
  const data = await service.getVenueDetails(req.vendor.id, req.params.venueId);
  res.status(200).json({
    success: true,
    data: data,
  });
}

export async function uploadCoverImage(req, res) {
  await service.uploadCoverImage(req.vendor.id, req.params.venueId, req.file);
  res
    .status(201)
    .json({ success: true, message: 'Cover image uploaded sucessfully' });
}

export async function uploadVenueImages(req, res) {
  const data = {
    vendorId: req.vendor.id,
    venueId: req.params.venueId,
    ...req.body,
    files: req.files,
  };
  await service.uploadVenueImages(data);
  res
    .status(201)
    .json({ success: true, message: 'Venue images edited sucessfully' });
}

export async function updateVenueDetails(req, res) {
  const data = await service.updateVenueDetails(
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

export async function updateVenueHours(req, res) {
  await service.updateVenueHours(req.vendor.id, req.params.venueId, req.body);

  res.status(201).json({
    success: true,
    message: 'Venue hours updated successfully',
  });
}

export async function updateVenuePricing(req, res) {
  await service.updateVenuePricing(req.vendor.id, req.params.venueId, req.body);
  res.status(201).json({
    success: true,
    message: 'Venue pricing updated successfully',
  });
}
