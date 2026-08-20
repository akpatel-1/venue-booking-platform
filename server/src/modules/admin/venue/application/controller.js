import { getApplications } from './service.js';

export async function listApplications(req, res) {
  const data = await getApplications(req.query.status);
  res.status(200).json({ success: true, data });
}
