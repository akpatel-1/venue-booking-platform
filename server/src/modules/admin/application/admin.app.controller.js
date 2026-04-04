import { service } from './admin.app.service.js';

export const controller = {
  async handleApplicationRequest(req, res) {
    const result = await service.processApplicationRequest(req.data.status);
    res.status(200).json({ status: true, applications: result });
  },

  async handleUpdateRequest(req, res) {
    await service.processStatusUpdate(req.admin.id, req.data);
    res.status(201).json({ status: true, message: 'Status updated' });
  },

  async handleApplicationCount(req, res) {
    const count = await service.processStatusCount(req.data.status);
    res.status(200).json({ status: true, count });
  },
};
