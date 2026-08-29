import express from 'express';

import upload from '../../../../middleware/file.upload.js';
import {
  requireFile,
  requireFiles,
  validateFileType,
} from '../../../../middleware/file.validation.js';
import validateSchema from '../../../../middleware/schema.validation.js';
import {
  getVenue,
  updateVenue,
  uploadImage,
  uploadImages,
} from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get('/venues/:id', validateSchema(schema, 'params'), getVenue);

router.patch(
  '/venues/:id/cover',
  upload(1, 0).single('cover_image'),
  validateSchema(schema, 'params'),
  requireFile,
  validateFileType,
  uploadImage
);

router.patch(
  '/venues/:id/images',
  validateSchema(schema.id, 'params'),
  upload(10, 10).array('venue_images', 10),
  validateSchema(schema.deleteIds),
  validateFileType,
  uploadImages
);

router.patch(
  '/venues/:id/reverification',
  validateSchema(schema.id, 'params'),
  validateSchema(schema.reverification),
  updateVenue
);

export default router;
