import express from 'express';

import { adminSession } from './session.controller.js';
import { sessionValidation } from './session.middleware.js';

export const adminSessionRoutes = express.Router();

adminSessionRoutes.get('/session', sessionValidation, adminSession);
