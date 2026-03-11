import { PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

import { r2 } from '../../infrastructure/s3/s3.js';

export async function uploadToR2(file, key, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await r2.send(command);
  return key;
}
