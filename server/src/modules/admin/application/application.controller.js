import { service } from './application.service.js';

export const controller = {
  async handleApplicationRequest(req, res) {
    const result = await service.processApplicationRequest(req.data.status);
    res.status(200).json({ applications: result });
  },

  async handleUpdateRequest(req, res) {
    await service.processStatusUpdate(req.admin.id, req.data);
    res.status(201).json({ message: 'Status updated' });
  },
};
