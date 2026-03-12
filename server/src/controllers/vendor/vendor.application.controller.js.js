import {
  processApplication,
  processApplicationStatus,
} from '../../services/vendor/vendor.verification.services.js';

export async function checkApplicationStatus(req, res) {
  const data = await processApplicationStatus(req.userId);
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
