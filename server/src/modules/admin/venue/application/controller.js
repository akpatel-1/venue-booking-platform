import { getApplications, updateApplication } from './service.js';

export async function listApplications(req, res) {
  const data = await getApplications(req.query.status);
  res.status(200).json({ success: true, data });
}

export async function reviewApplication(req, res) {
  const data = await updateApplication(req.admin.id, req.data);
  res.status(201).json({
    success: true,
    message: 'Application updated successfully',
    data: data,
  });
}
