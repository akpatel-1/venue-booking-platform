import { service } from './admin.app.service.js';

export const controller = {
  async listApplications(req, res) {
    const result = await service.fetchApplication(req.data.status);
    res.status(200).json({ status: true, applications: result });
  },

  async updateApplication(req, res) {
    await service.updateApplicationStatus(req.admin.id, req.data);
    res.status(201).json({ status: true, message: 'Status updated' });
  },

  async listApplicationCount(req, res) {
    const count = await service.fetchApplicationCount(req.data.status);
    res.status(200).json({ status: true, count });
  },
};
