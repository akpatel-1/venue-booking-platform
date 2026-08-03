import multer from 'multer';

import { VENDOR_ERROR_CONFIG } from '../modules/vendor/vendor.error.config.js';
import ApiError from '../utils/api.error.util.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export default function upload(maxSize) {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new ApiError(VENDOR_ERROR_CONFIG.FILE_TYPE_MISMATCH));
      }
    },
  });
}
