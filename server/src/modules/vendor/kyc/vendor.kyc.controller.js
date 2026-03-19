import { vendorApplicationService } from './vendor.kyc.service.js';

export const vendorApplicationController = {
  async checkApplicationStatus(req, res) {
    const data = await vendorApplicationService.processApplicationStatus(
      req.userId
    );
    res.status(200).json({ ...data });
  },

  async submitApplication(req, res) {
    const id = await vendorApplicationService.processApplication(
      req.userId,
      req.data.body,
      req.file
    );
    res.status(201).json({
      data: id,
      message: 'Application successfully submitted',
    });
  },
};
