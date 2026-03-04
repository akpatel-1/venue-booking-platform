import { pool } from '../../infrastructure/database/db.js';
import { findLatestVendorApplicationByUserId } from '../../models/vendor/vendor.verification.model.js';

export async function fetchVendorApplicationStatus(userId) {
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
