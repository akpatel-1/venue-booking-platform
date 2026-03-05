import express from 'express';

import { handleGetVendorStatus } from '../controllers/vendor/vendor.verification.controller.js';
import { ensureAccountActive } from '../middlewares/shared/account.guard.js';
import { requireAuth } from '../middlewares/shared/auth.middleware.js';

export const vendorRoutes = express.Router();

vendorRoutes.get(
  '/partners/application/status',
  requireAuth,
  ensureAccountActive,
  handleGetVendorStatus
);
