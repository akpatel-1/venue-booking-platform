import multer from 'multer';

import { ApiError } from '../../utils/api.error.util.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export function upload(maxSize) {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new ApiError(
            400,
            'Invalid file type. Only JPG and PNG are allowed.',
            'FILE_TYPE_MISMATCH'
          )
        );
      }
    },
  });
}
