import express from 'express';

import {
  handleGetVendorStatus,
  submitApplication,
} from '../controllers/vendor/vendor.application.controller.js.js';
import { ensureAccountActive } from '../middlewares/shared/account.guard.js';
import { requireAuth } from '../middlewares/shared/auth.middleware.js';
import { validateRequest } from '../middlewares/shared/validate.request.js';
import { checkExistingApplication } from '../middlewares/vendor/existing.application.js';
import { upload } from '../middlewares/vendor/file.upload.middleware.js';
import { requireDocument } from '../middlewares/vendor/require.document.js';
import { vendorApplicationSchema } from '../validators/application.validation.js';

export const vendorRoutes = express.Router();

vendorRoutes.get(
  '/partners/application/status',
  requireAuth,
  ensureAccountActive,
  handleGetVendorStatus
);

vendorRoutes.post(
  '/partners/application/apply',
  requireAuth,
  ensureAccountActive,
  upload(5 * 1024 * 1024).single('document'),
  requireDocument,
  validateRequest(vendorApplicationSchema),
  checkExistingApplication,
  submitApplication
);
