import express from 'express';

import fileUploadToR2 from '../../../middleware/file.upload.js';
import validateSchema from '../../../middleware/schema.validation.js';
import { authenticateToken, ensureAccountActive } from '../auth/middleware.js';
import { handleApplicationStatus, submitApplication } from './controller.js';
import { checkExistingApplication, requireDocument } from './middleware.js';
import applicationSchema from './schema.js';

const userApplicationRoutes = express.Router();

userApplicationRoutes.get(
  '/application/status',
  authenticateToken,
  ensureAccountActive,
  handleApplicationStatus
);

userApplicationRoutes.post(
  '/application',
  authenticateToken,
  ensureAccountActive,
  fileUploadToR2(5 * 1024 * 1024).single('pan_document'),
  requireDocument,
  validateSchema(applicationSchema),
  checkExistingApplication,
  submitApplication
);

export default userApplicationRoutes;
