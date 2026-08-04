import argon2 from 'argon2';

import { ERROR_CONFIG } from '../../../config/error.config.js';
import ApiError from '../../../utils/api.error.util.js';
import {
  createAdminSession,
  deleteAdminSession,
} from '../session/admin.session.repository.js';
import { findAdminByEmail } from './admin.auth.repository.js';

export async function authenticateAdmin({ email, password }) {
  const admin = await verifyAdminCredentials(email, password);

  const sessionId = await createAdminSession(admin.id);

  return {
    sessionId,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  };
}

async function verifyAdminCredentials(email, password) {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(ERROR_CONFIG.INVALID_CREDENTIALS);
  }

  const isMatch = await argon2.verify(admin.password_hash, password);

  if (!isMatch) {
    throw new ApiError(ERROR_CONFIG.INVALID_CREDENTIALS);
  }

  return admin;
}
