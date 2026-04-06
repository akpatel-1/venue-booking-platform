import { pool } from '../../../infrastructure/database/db.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { withTransaction } from '../../../utils/transaction.util.js';
import { APPLICATION_ERROR_CONFIG } from './admin.app.error.config.js';
import { repository } from './admin.app.repository.js';

export const service = {
  async processAppRequest(status) {
    return await repository.getVendorApplication(pool, status);
  },

  async processStatusUpdate(reviewer_Id, data) {
    const { status } = data;

    if (status === 'approved') {
      return this._handleApproved(reviewer_Id, data.id);
    }

    return this._handleRejected(reviewer_Id, data);
  },

  async _handleApproved(reviewer_Id, id) {
    await withTransaction(pool, async (client) => {
      const result = await repository.markVendorAsApproved(client, {
        id,
        status: 'approved',
        reviewedBy: reviewer_Id,
      });

      if (!result) {
        throw new ApiError(APPLICATION_ERROR_CONFIG.USER_NOT_FOUND);
      }

      await repository.createVendorProfile(client, result);
      await repository.markUserAsVendor(client, id);
    });
  },

  async _handleRejected(reviewer_Id, data) {
    await repository.markVendorAsRejected(pool, {
      id: data.id,
      status: 'rejected',
      rejectionReason: data.rejection_reason,
      reviewedBy: reviewer_Id,
    });
  },

  async processStatusCount(status) {
    return await repository.getStatusCount(pool, status);
  },
};
