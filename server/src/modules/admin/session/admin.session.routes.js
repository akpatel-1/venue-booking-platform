import express from 'express';

import { adminSession } from './admin.session.controller.js';
import { sessionValidation } from './admin.session.middleware.js';

export const adminSessionRoutes = express.Router();

adminSessionRoutes.get('/session', sessionValidation, adminSession);
