import { fetchVendorApplicationStatus } from '../../services/vendor/vendor.verification.services.js';

export async function handleGetVendorStatus(req, res) {
  const data = await fetchVendorApplicationStatus(req.userId);
  res.status(200).json({ success: true, ...data });
}
