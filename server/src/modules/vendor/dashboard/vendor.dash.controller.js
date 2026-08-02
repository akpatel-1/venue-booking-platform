import { success } from 'zod';

import { service } from './vendor.dash.service.js';

export const controller = {
  async getVendorProfile(req, res) {
    const data = await service.fetchVendorProfile(req.user);
    res.status(200).json({
      success: true,
      ...data,
    });
  },
};
