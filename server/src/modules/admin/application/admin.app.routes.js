import express from 'express';

import { validateSchema } from '../../../middleware/schema.validation.js';
import { validateSession } from '../session/admin.session.middleware.js';
import { controller } from './admin.app.controller.js';
import { schema } from './admin.app.schema.js';

const adminAppRoutes = express.Router();

adminAppRoutes.get(
  '/application',
  validateSession,
  validateSchema(schema.status, 'query'),
  controller.listApplications
);

adminAppRoutes.patch(
  '/application/:id',
  validateSession,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  controller.updateApplication
);

adminAppRoutes.get(
  '/application/:status',
  validateSession,
  validateSchema(schema.status, 'params'),
  controller.listApplicationCount
);

export default adminAppRoutes;
