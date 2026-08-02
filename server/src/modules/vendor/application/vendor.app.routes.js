import express from 'express';

import { upload } from '../../../middleware/file.upload.js';
import { validateSchema } from '../../../middleware/schema.validation.js';
import { middleware } from '../../user/auth/user.auth.middleware.js';
import { controller } from './vendor.app.controller.js';
import { checkExistingApp } from './vendor.app.middleware.js';
import { schema } from './vendor.app.schema.js';
import { requireDocument } from './vendor.app.validator.js';

const vendorAppRoutes = express.Router();

vendorAppRoutes.get(
  '/application/status',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  controller.handleStatusRequest
);

vendorAppRoutes.post(
  '/application',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  upload(5 * 1024 * 1024).single('pan_document'),
  requireDocument,
  validateSchema(schema),
  checkExistingApp,
  controller.submitApplication
);

export default vendorAppRoutes;
