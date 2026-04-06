import express from 'express';

import { adminSession } from './admin.session.controller.js';
import { validateSession } from './admin.session.middleware.js';

export const adminSessionRoutes = express.Router();

adminSessionRoutes.get('/auth/me', validateSession, adminSession);
