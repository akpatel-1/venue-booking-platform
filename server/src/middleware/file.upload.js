import multer from 'multer';

import ApiError from '../utils/api.error.util.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export default function uploadToR2(maxSize) {
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
          new ApiError({
            statusCode: 400,
            message: 'Invalid file type. Only JPG and PNG are allowed.',
            code: 'FILE_TYPE_MISMATCH',
          })
        );
      }
    },
  });
}
