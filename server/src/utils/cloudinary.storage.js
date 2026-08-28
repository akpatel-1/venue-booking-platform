import cloudinary from '../infrastructure/cloudinary/cloudinary.js';

export function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'image',
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result.public_id);
      }
    );

    stream.end(buffer);
  });
}

export function deleteFromCloudinary(publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );
  });
}
