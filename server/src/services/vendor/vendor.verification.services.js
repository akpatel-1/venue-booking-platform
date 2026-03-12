import path from 'path';

import { pool } from '../../infrastructure/database/db.js';
import {
  findLatestVendorApplicationByUserId,
  insertVendorApplication,
} from '../../models/vendor/vendor.verification.model.js';
import { deleteFromR2 } from '../../utils/vendor/delete.from.r2.js';
import { uploadToR2 } from '../../utils/vendor/upload.to.r2.js';

export async function processApplicationStatus(userId) {
  const application = await findLatestVendorApplicationByUserId(pool, userId);

  if (!application) {
    return { state: 'not_applied' };
  }

  const response = { state: application.status };

  if (application.status === 'rejected') {
    response.reason = application.rejection_reason;
  }

  return response;
}

export async function processApplication(userId, userData, userFile) {
  const ext = path.extname(userFile.originalname);
  const key = `vendor-application/${userId}/${Date.now()}-verification${ext}`;

  const documentUrl = await uploadToR2(userFile.buffer, key, userFile.mimetype);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const id = await insertVendorApplication(client, {
      userId,
      ...userData,
      documentUrl,
    });
    await client.query('COMMIT');
    return id;
  } catch (err) {
    await client.query('ROLLBACK');
    await deleteFromR2(key);
    throw err;
  } finally {
    await client.release();
  }
}
