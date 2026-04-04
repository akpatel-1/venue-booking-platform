import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/admin.session.middleware.js';
import { controller } from './admin.app.controller.js';
import { schema } from './admin.app.schema.js';

export const adminAppRoutes = express.Router();

adminAppRoutes.get(
  '/application',
  sessionValidation,
  validateSchema(schema.status, 'query'),
  controller.handleApplicationRequest
);

adminAppRoutes.patch(
  '/application/:id',
  sessionValidation,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  controller.handleUpdateRequest
);

adminAppRoutes.get(
  '/application/:status',
  sessionValidation,
  validateSchema(schema.status, 'params'),
  controller.handleApplicationCount
);
