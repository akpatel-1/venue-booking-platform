import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import { listApplications } from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/venue/applications',
  validateSchema(schema, 'query'),
  listApplications
);

export default router;
