import express from 'express';

import fileUploadToR2 from '../../../middleware/file.upload.js';
import validateSchema from '../../../middleware/schema.validation.js';
import { authenticateToken, ensureAccountActive } from '../auth/middleware.js';
import { handleApplicationStatus, submitApplication } from './controller.js';
import { checkExistingApplication, requireDocument } from './middleware.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/application/status',
  authenticateToken,
  ensureAccountActive,
  handleApplicationStatus
);

router.post(
  '/application',
  authenticateToken,
  ensureAccountActive,
  fileUploadToR2(5 * 1024 * 1024).single('pan_document'),
  requireDocument,
  validateSchema(schema),
  checkExistingApplication,
  submitApplication
);

export default router;
