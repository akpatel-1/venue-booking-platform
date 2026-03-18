import express from 'express';

import { sessionValidation } from '../session/admin.session.middleware.js';
import { handleApplicationRequest } from './application.controller.js';
import { validateApplicationRequest } from './application.validation.js';

export const adminApplicationRoutes = express.Router();

adminApplicationRoutes.get(
  '/application',
  sessionValidation,
  validateApplicationRequest,
  handleApplicationRequest
);
