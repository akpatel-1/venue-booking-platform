import express from 'express';

import fileUploadToR2 from '../../../middleware/file.upload.js';
import validateSchema from '../../../middleware/schema.validation.js';
import {
  authenticateToken,
  ensureAccountActive,
} from '../auth/user.auth.middleware.js';
import {
  handleApplicationStatus,
  submitApplication,
} from './user.application.controller.js';
import {
  checkExistingApplication,
  requireDocument,
} from './user.application.middleware.js';
import applicationSchema from './user.application.schema.js';

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
