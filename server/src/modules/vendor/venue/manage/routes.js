import express from 'express';

import validateSchema from '../../../../middleware/schema.validation.js';
import { getVenue } from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get('/venue/:id', validateSchema(schema, 'params'), getVenue);

export default router;
