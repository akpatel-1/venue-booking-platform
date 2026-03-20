import { service } from './application.service.js';

export const controller = {
  async handleStatusRequest(req, res) {
    const data = await service.processApplicationStatus(req.userId);
    res.status(200).json({ ...data });
  },

  async submitApplication(req, res) {
    const id = await service.processApplication(req.userId, req.data, req.file);
    res.status(201).json({
      data: id,
      message: 'Application successfully submitted',
    });
  },
};
