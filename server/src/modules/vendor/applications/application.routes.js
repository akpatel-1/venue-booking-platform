import express from 'express';

import { upload } from '../../file.upload.middleware.js';
import { validateSchema } from '../../schema.validation.middleware.js';
import { middleware } from '../../user/auth/auth.middleware.js';
import { controller } from './application.controller.js';
import { checkExistingApplication } from './application.middleware.js';
import { schema } from './application.schema.js';
import { requireDocument } from './application.validator.js';

export const vendorApplicationRoutes = express.Router();

vendorApplicationRoutes.get(
  '/application/status',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  controller.handleStatusRequest
);

vendorApplicationRoutes.post(
  '/application',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  upload(5 * 1024 * 1024).single('pan_document'),
  requireDocument,
  validateSchema(schema),
  checkExistingApplication,
  controller.submitApplication
);
