import { pool } from '../../../../infrastructure/database/db.js';
import ApiError from '../../../../utils/api.error.js';
import { getPrivateUrl } from '../../../../utils/r2.storage.js';
import { withTransaction } from '../../../../utils/transaction.js';
import { APPLICATION_ERROR_CONFIG } from './error.config.js';
import {
  createVenue,
  fetchApplications,
  markVenueAsApproved,
  markVenueAsRejected,
} from './repository.js';

export async function getApplications(status) {
  const applications = await fetchApplications(status);
  return Promise.all(
    applications.map(async (item) => {
      return {
        id: item.id,
        vendor_id: item.vendor_id,
        name: item.name,
        venue_details: item.venue_details,
        category: item.category,
        address: item.address,
        district: item.district,
        state: item.state,
        pincode: item.pincode,
        geo_loc: item.geo_loc,
        images: await Promise.all(
          item.images.map(async (image) => getPrivateUrl(image))
        ),
        proof_document_url: await getPrivateUrl(item.proof_document_key),
        rejection_reason: item.rejection_reason,
        submitted_at: item.submitted_at,
        reviewed_at: item.reviewed_at,
        reviewed_by: item.reviewed_by,
      };
    })
  );
}

export async function updateApplication(reviewed_by, data) {
  if (data.status === 'rejected') {
    const result = await markVenueAsRejected(reviewed_by, data);
    if (!result) {
      throw new ApiError(APPLICATION_ERROR_CONFIG.APPLICATION_NOT_PENDING);
    }
    return result;
  }
  return withTransaction(pool, async (client) => {
    const result = await markVenueAsApproved(client, reviewed_by, data);
    if (!result) {
      throw new ApiError(APPLICATION_ERROR_CONFIG.APPLICATION_NOT_PENDING);
    }
    return await createVenue(client, result);
  });
}
