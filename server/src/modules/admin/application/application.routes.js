import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/admin.session.middleware.js';
import { handleApplicationRequest } from './application.controller.js';
import { applicationSchema } from './application.schema.js';

export const adminApplicationRoutes = express.Router();

adminApplicationRoutes.get(
  '/application',
  sessionValidation,
  validateSchema(applicationSchema.status),
  handleApplicationRequest
);
