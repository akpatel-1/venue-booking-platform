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
  updateHours,
  updateVenue,
  uploadImage,
  uploadImages,
} from './controller.js';
import schema from './schema.js';

const router = express.Router();

router.get(
  '/venues/:venueId',
  validateSchema(schema.venueId, 'params'),
  getVenue
);

router.patch(
  '/venues/:venueId/cover',
  upload(1, 0).single('cover_image'),
  validateSchema(schema.venueId, 'params'),
  requireFile,
  validateFileType,
  uploadImage
);

router.patch(
  '/venues/:venueId/images',
  validateSchema(schema.venueId, 'params'),
  upload(10, 10).array('venue_images', 10),
  validateSchema(schema.deleteIds),
  validateFileType,
  uploadImages
);

router.patch(
  '/venues/:venueId/reverification',
  validateSchema(schema.venueId, 'params'),
  validateSchema(schema.reverification),
  updateVenue
);

router.patch(
  '/venues/:venueId/operation-hours',
  validateSchema(schema.venueId, 'params'),
  validateSchema(schema.hours),
  updateHours
);

export default router;
