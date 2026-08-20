import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import {
  listApplicationCount,
  listApplications,
  updateApplication,
} from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/vendor/applications',
  validateSchema(schema.status, 'query'),
  listApplications
);

router.patch(
  '/vendor/applications/:id',
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  updateApplication
);

router.get(
  '/applications/:status',
  validateSchema(schema.status, 'params'),
  listApplicationCount
);

export default router;
