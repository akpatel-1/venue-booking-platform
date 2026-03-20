import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/session.middleware.js';
import { controller } from './auth.controller.js';
import { schema } from './auth.schema.js';

export const adminAuth = express.Router();

adminAuth.post('/login', validateSchema(schema), controller.handleAdminLogin);
adminAuth.post('/logout', sessionValidation, controller.handleAdminLogout);
