import { processSubmission } from './service.js';

export async function submitApplication(req, res) {
  const data = await processSubmission(req.vendor.id, req.body, req.files);
  return res.status(201).json({
    success: true,
    message: 'Venue application submitted',
    data: data,
  });
}
