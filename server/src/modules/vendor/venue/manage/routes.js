import express from 'express';

import upload from '../../../../middleware/file.upload.js';
import {
  requireFile,
  requireFiles,
  validateFileType,
} from '../../../../middleware/file.validation.js';
import validateSchema from '../../../../middleware/schema.validation.js';
import { getVenue, uploadImage } from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get('/venue/:id', validateSchema(schema, 'params'), getVenue);

router.patch(
  '/venue/:id/cover',
  validateSchema(schema, 'params'),
  upload(1, 0).single('cover_image'),
  requireFile,
  validateFileType,
  uploadImage
);

export default router;
