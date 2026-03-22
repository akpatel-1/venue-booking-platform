import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/session.middleware.js';
import { controller } from './application.controller.js';
import { schema } from './application.schema.js';

export const adminApplicationRoutes = express.Router();

adminApplicationRoutes.get(
  '/application',
  sessionValidation,
  validateSchema(schema.status, 'query'),
  controller.handleApplicationRequest
);

adminApplicationRoutes.patch(
  '/application/:id',
  sessionValidation,
  validateSchema(schema.id, 'params'),
  validateSchema(schema.review, 'body'),
  controller.handleUpdateRequest
);

adminApplicationRoutes.get(
  '/application/:status',
  sessionValidation,
  validateSchema(schema.status, 'params'),
  controller.handleApplicationCount
);
