import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import validateSession from '../../auth/middleware.js';
import { schema } from './schema.js';
import {
  fetchApplication,
  fetchApplicationCount,
  updateApplicationStatus,
} from './service.js';

const adminVendorApplicationRoutes = express.Router();

adminVendorApplicationRoutes.get(
  '/application',
  validateSession,
  validateSchema(schema.status, 'query'),
  fetchApplication
);

adminVendorApplicationRoutes.patch(
  '/application/:id',
  validateSession,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  updateApplicationStatus
);

adminVendorApplicationRoutes.get(
  '/application/:status',
  validateSession,
  validateSchema(schema.status, 'params'),
  fetchApplicationCount
);

export default adminVendorApplicationRoutes;
