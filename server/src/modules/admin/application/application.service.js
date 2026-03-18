import { pool } from '../../../infrastructure/database/db.js';
import { applicationRepository } from './application.repository.js';

export async function processApplicationRequest(status) {
  return await applicationRepository.getVendorApplication(pool, status);
}
