import argon2 from 'argon2';

import { ApiError } from '../../../utils/api.error.util.js';
import { sessionRepository } from '../session/admin.session.repository.js';
import { ADMIN_AUTH_ERRORS } from './admin.auth.config.js';
import { findAdminByEmail } from './admin.auth.repository.js';

export async function loginAdmin({ email, password }, oldSessionId) {
  if (oldSessionId) {
    await sessionRepository.delete(oldSessionId);
  }

  const admin = await authenticateAdmin(email, password);

  const sessionId = await sessionRepository.create(admin.id);

  return {
    sessionId,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  };
}

async function authenticateAdmin(email, password) {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(
      401,
      'Invalid credentials',
      ADMIN_AUTH_ERRORS.INVALID_CREDENTIALS
    );
  }

  const isMatch = await argon2.verify(admin.password_hash, password);
  if (!isMatch) {
    throw new ApiError(
      401,
      'Invalid credentials',
      ADMIN_AUTH_ERRORS.INVALID_CREDENTIALS
    );
  }

  return admin;
}

export async function logoutAdmin(sessionId) {
  if (sessionId) {
    await sessionRepository.delete(sessionId);
  }
}
