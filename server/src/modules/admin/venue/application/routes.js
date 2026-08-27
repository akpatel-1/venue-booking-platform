import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import { listApplications, reviewApplication } from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/venue/applications',
  validateSchema(schema.status, 'query'),
  listApplications
);

router.patch(
  '/venue/applications/:id',
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  reviewApplication
);

export default router;
