import express from 'express';

import upload from '../../../../middleware/file.upload.js';
import validateSchema from '../../../../middleware/schema.validation.js';
import { submitApplication } from './controller.js';
import validateFileCount from './middleware.js';
import schema from './schema.js';

const router = express.Router();

router.post(
  '/venue/application',
  upload(5 * 1024 * 1024, 6, 11).fields([
    { name: 'venue_images', maxCount: 5 },
    { name: 'proof_document', maxCount: 1 },
  ]),
  validateSchema(schema),
  validateFileCount,
  submitApplication
);

export default router;
