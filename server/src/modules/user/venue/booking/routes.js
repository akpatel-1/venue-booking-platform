import express from 'express';

import * as controller from './controller.js';

const router = express.Router();

router.get('/venues', controller.getVenues);

export default router;
