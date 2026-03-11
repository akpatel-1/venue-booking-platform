import {
  fetchVendorApplicationStatus,
  processApplication,
} from '../../services/vendor/vendor.verification.services.js';

export async function handleGetVendorStatus(req, res) {
  const data = await fetchVendorApplicationStatus(req.userId);
  res.status(200).json({ success: true, ...data });
}

export async function submitApplication(req, res) {
  const id = await processApplication(req.userId, req.data, req.file);
  res.status(201).json({
    success: true,
    data: id,
    message: 'Application successfully submitted',
  });
}
