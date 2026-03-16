import path from 'path';

import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { r2Storage } from '../../../utils/r2.storage.utils.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { vendorApplicationRepository } from './vendor.kyc.repository.js';

export const vendorApplicationService = {
  async processApplicationStatus(userId) {
    const application =
      await vendorApplicationRepository.findLatestVendorApplicationByUserId(
        pool,
        userId
      );

    if (!application) {
      return { state: 'not_applied' };
    }

    const response = { state: application.status };

    if (application.status === 'rejected') {
      response.reason = application.rejection_reason;
    }

    return response;
  },

  async processApplication(userId, userData, userFile) {
    const ext = path.extname(userFile.originalname);
    const key = `vendor-application/${userId}/${Date.now()}-verification${ext}`;
    let documentUrl = null;

    try {
      documentUrl = await r2Storage.upload(
        userFile.buffer,
        key,
        userFile.mimetype
      );

      return await withTransaction(pool, async (client) => {
        return await vendorApplicationRepository.insertVendorApplication(
          client,
          {
            userId,
            ...userData,
            documentUrl,
          }
        );
      });
    } catch (err) {
      if (documentUrl) {
        await r2Storage.delete(key);
      }
      throw err;
    }
  },
};
