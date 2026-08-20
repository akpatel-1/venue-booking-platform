import { pool } from '../../../../../infrastructure/database/db.js';
import ApiError from '../../../../../utils/api.error.js';
import { getPrivateUrl } from '../../../../../utils/r2.storage.js';
import { withTransaction } from '../../../../../utils/transaction.js';
import { APPLICATION_ERROR_CONFIG } from './error.config.js';
import {
  createVendorProfile,
  findApplicationsByStatus,
  getStatusCount,
  markUserAsVendor,
  markVendorAsApproved,
  markVendorAsRejected,
} from './repository.js';

export async function getApplications(status) {
  const applications = await findApplicationsByStatus(pool, status);
  switch (status) {
    case 'pending':
      return formatPendingResponse(applications);

    case 'approved':
      return formatApprovedResponse(applications);

    case 'rejected':
      return formatRejectedResponse(applications);

    default:
      throw new ApiError(APPLICATION_ERROR_CONFIG.INVALID_STATUS);
  }
}

async function formatPendingResponse(applications) {
  return Promise.all(
    applications.map(async (item) => {
      return {
        id: item.id,
        pan_name: item.pan_name,
        phone: item.phone,
        address: item.address,
        district: item.district,
        state: item.state,
        pincode: item.pincode,
        pan_number: item.pan_number,
        pan_document_url: await getPrivateUrl(item.pan_document_key),
      };
    })
  );
}
function formatApprovedResponse(applications) {
  return applications.map((item) => {
    return {
      id: item.id,
      pan_name: item.pan_name,
      phone: item.phone,
      district: item.district,
      state: item.state,
      submitted_at: item.submitted_at,
      reviewed_at: item.reviewed_at,
      reviewed_by: item.reviewed_by,
    };
  });
}

function formatRejectedResponse(applications) {
  return applications.map((item) => {
    return {
      id: item.id,
      pan_name: item.pan_name,
      phone: item.phone,
      district: item.district,
      state: item.state,
      submitted_at: item.submitted_at,
      reviewed_at: item.reviewed_at,
      reviewed_by: item.reviewed_by,
      rejection_reason: item.rejection_reason,
    };
  });
}

export async function reviewApplication(reviewerId, data) {
  if (data.status === 'approved') {
    return handleApproved(reviewerId, data.id);
  }

  return handleRejected(reviewerId, data);
}

async function handleApproved(reviewerId, id) {
  await withTransaction(pool, async (client) => {
    const application = await markVendorAsApproved(client, {
      id,
      status: 'approved',
      reviewedBy: reviewerId,
    });

    if (!application) {
      throw new ApiError(APPLICATION_ERROR_CONFIG.APPLICATION_NOT_PENDING);
    }

    await createVendorProfile(client, application);
    await markUserAsVendor(client, application.user_id);
  });
}

async function handleRejected(reviewerId, data) {
  const application = await markVendorAsRejected(pool, {
    id: data.id,
    status: 'rejected',
    rejectionReason: data.rejection_reason,
    reviewedBy: reviewerId,
  });

  if (!application) {
    throw new ApiError(APPLICATION_ERROR_CONFIG.APPLICATION_NOT_PENDING);
  }
}

export async function getApplicationsCount(status) {
  return await getStatusCount(pool, status);
}
