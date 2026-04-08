import express from 'express';

import { middleware } from '../../user/auth/user.auth.middleware.js';
import { verifyVendorRole } from '../vendor.auth.middleware.js';
import { controller } from './vendor.dash.controller.js';

export const vendorDashRoutes = express.Router();

vendorDashRoutes.use(
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  verifyVendorRole
);

vendorDashRoutes.get('/profile', controller.getVendorProfile);
