import express from 'express';

import { upload } from '../../file.upload.middleware.js';
import { validateSchema } from '../../schema.validation.middleware.js';
import { userAuthMiddleware } from '../../user/auth/user.auth.middleware.js';
import { vendorApplicationController } from './vendor.kyc.controller.js';
import { checkExistingApplication } from './vendor.kyc.middleware.js';
import { requireDocument } from './vendor.kyc.validator.js';
import { vendorKycSchema } from './vendor.kyc.schema.js';

export const vendorApplicationRoutes = express.Router();

vendorApplicationRoutes.get(
  '/application/status',
  userAuthMiddleware.authenticateToken,
  userAuthMiddleware.ensureAccountActive,
  vendorApplicationController.checkApplicationStatus
);

vendorApplicationRoutes.post(
  '/application',
  userAuthMiddleware.authenticateToken,
  userAuthMiddleware.ensureAccountActive,
  upload(5 * 1024 * 1024).single('pan_document'),
  requireDocument,
  validateSchema(vendorKycSchema),
  checkExistingApplication,
  vendorApplicationController.submitApplication
);
