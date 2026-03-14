import express from 'express';

import { upload } from '../../file.upload.middleware.js';
import { validateSchema } from '../../schema.validation.middleware.js';
import { userAuthMiddleware } from '../../user/auth/user.auth.middleware.js';
import { vendorApplicationController } from './vendor.application.controller.js';
import { checkExistingApplication } from './vendor.application.middleware.js';
import { vendorApplicationSchema } from './vendor.application.schema.js';
import { requireDocument } from './vendor.application.validator.js';

export const vendorApplicationRoutes = express.Router();

vendorApplicationRoutes.get(
  '/application/status',
  userAuthMiddleware.authenticateToken,
  userAuthMiddleware.ensureAccountActive,
  vendorApplicationController.checkApplicationStatus
);

vendorApplicationRoutes.post(
  '/application/apply',
  userAuthMiddleware.authenticateToken,
  userAuthMiddleware.ensureAccountActive,
  upload(5 * 1024 * 1024).single('document'),
  requireDocument,
  validateSchema(vendorApplicationSchema),
  checkExistingApplication,
  vendorApplicationController.submitApplication
);
