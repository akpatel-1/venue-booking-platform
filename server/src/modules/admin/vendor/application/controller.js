import {
  fetchApplication,
  fetchApplicationCount,
  updateApplicationStatus,
} from './service.js';

export async function listApplications(req, res) {
  const result = await fetchApplication(req.data.status);
  res.status(200).json({ status: true, applications: result });
}

export async function updateApplication(req, res) {
  await updateApplicationStatus(req.admin.id, req.data);
  res.status(201).json({ status: true, message: 'Status updated' });
}

export async function listApplicationCount(req, res) {
  const count = await fetchApplicationCount(req.data.status);
  res.status(200).json({ status: true, count });
}
