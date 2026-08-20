import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import validateSession from '../../auth/middleware.js';
import {
  listApplicationCount,
  listApplications,
  updateApplication,
} from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/vendor/applications',
  validateSession,
  validateSchema(schema.status, 'query'),
  listApplications
);

router.patch(
  '/vendor/applications/:id',
  validateSession,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  updateApplication
);

router.get(
  '/applications/:status',
  validateSession,
  validateSchema(schema.status, 'params'),
  listApplicationCount
);

export default router;
