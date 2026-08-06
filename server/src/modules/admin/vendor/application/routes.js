import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import validateSession from '../../auth/middleware.js';
import { schema } from './schema.js';
import {
  fetchApplication,
  fetchApplicationCount,
  updateApplicationStatus,
} from './service.js';

const router = express.Router();

router.get(
  '/application',
  validateSession,
  validateSchema(schema.status, 'query'),
  fetchApplication
);

router.patch(
  '/application/:id',
  validateSession,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  updateApplicationStatus
);

router.get(
  '/application/:status',
  validateSession,
  validateSchema(schema.status, 'params'),
  fetchApplicationCount
);

export default router;
