import { getApplicationStatus, processApplication } from './service.js';

export async function handleApplicationStatus(req, res) {
  const data = await getApplicationStatus(req.user.id);
  res.status(200).json({ success: true, data });
}

export async function submitApplication(req, res) {
  const id = await processApplication(req.user.id, req.data, req.file);
  res.status(201).json({
    success: true,
    message: 'Application successfully submitted',
    data: { id },
  });
}
