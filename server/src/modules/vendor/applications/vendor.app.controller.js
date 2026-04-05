import { service } from './vendor.app.service.js';

export const controller = {
  async handleStatusRequest(req, res) {
    const data = await service.processApplicationStatus(req.userId);
    res.status(200).json({ success: true, ...data });
  },

  async submitApplication(req, res) {
    const id = await service.processApplication(req.userId, req.data, req.file);
    res.status(201).json({
      success: true,
      data: id,
      message: 'Application successfully submitted',
    });
  },
};
