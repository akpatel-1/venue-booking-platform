import { pool } from '../../../../infrastructure/database/db.js';
import ApiError from '../../../../utils/api.error.util.js';
import { withTransaction } from '../../../../utils/transaction.util.js';
import { APPLICATION_ERROR_CONFIG } from './error.config.js';
import {
  createVendorProfile,
  getStatusCount,
  getVendorApplication,
  markUserAsVendor,
  markVendorAsApproved,
  markVendorAsRejected,
} from './repository.js';

export async function fetchApplication(status) {
  return await getVendorApplication(pool, status);
}

export async function updateApplicationStatus(reviewerId, data) {
  const { status } = data;

  if (status === 'approved') {
    return await handleApproved(reviewerId, data.id);
  }

  return await handleRejected(reviewerId, data);
}

async function handleApproved(reviewerId, id) {
  await withTransaction(pool, async (client) => {
    const result = await markVendorAsApproved(client, {
      id,
      status: 'approved',
      reviewedBy: reviewerId,
    });

    if (!result) {
      throw new ApiError(APPLICATION_ERROR_CONFIG.USER_NOT_FOUND);
    }

    await createVendorProfile(client, result);
    await markUserAsVendor(client, result.user_id);
  });
}

async function handleRejected(reviewerId, data) {
  await markVendorAsRejected(pool, {
    id: data.id,
    status: 'rejected',
    rejectionReason: data.rejection_reason,
    reviewedBy: reviewerId,
  });
}

export async function fetchApplicationCount(status) {
  return await getStatusCount(pool, status);
}
