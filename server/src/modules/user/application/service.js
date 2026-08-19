import path from 'path';

import { pool } from '../../../infrastructure/database/db.js';
import ApiError from '../../../utils/api.error.js';
import { deleteFromR2, uploadToR2 } from '../../../utils/r2.storage.js';
import { withTransaction } from '../../../utils/transaction.js';
import {
  findLatestApplicationByUserId,
  insertVendorApplication,
} from './repository.js';

export async function getApplicationStatus(userId) {
  const application = await findLatestApplicationByUserId(pool, userId);

  if (!application) {
    return { state: 'not_applied' };
  }

  if (application.status === 'rejected') {
    return {
      state: 'rejected',
      reason: application.rejection_reason,
    };
  }

  return {
    state: application.status,
  };
}

export async function processApplication(userId, userData, userFile) {
  const fileExtension = path.extname(userFile.originalname);
  const documentKey = `vendor-application/${userId}/${Date.now()}-pan${fileExtension}`;
  let upload = false;
  try {
    await uploadToR2(userFile.buffer, documentKey, userFile.mimetype);
    upload = true;
    return await withTransaction(pool, async (client) => {
      return await insertVendorApplication(client, {
        userId,
        ...userData,
        documentKey,
      });
    });
  } catch (err) {
    if (upload) {
      await deleteFromR2(documentKey);
    }
    throw err;
  }
}
