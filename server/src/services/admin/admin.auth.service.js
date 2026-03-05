import argon2 from 'argon2';

import {
  createAdminSession,
  deleteAdminSession,
} from '../../infrastructure/redis/admin.redis.session.js';
import { findAdminByEmail } from '../../models/admin.model.js';
import { ApiError } from '../../utils/api.error.util.js';

export async function login(credentials, oldSessionId) {
  if (oldSessionId) {
    await deleteAdminSession(oldSessionId);
  }

  const admin = await authenticateAdmin(credentials);
  const sessionId = await createAdminSession(admin.id);

  return {
    sessionId,
    admin,
  };
}
export async function authenticateAdmin({ email, password }) {
  const admin = await findAdminByEmail(email);
  if (!admin)
    throw new ApiError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');

  const isMatch = await argon2.verify(admin.password_hash, password);
  if (!isMatch)
    throw new ApiError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');

  return {
    id: admin.id,
    email: admin.email,
  };
}

export async function logout(sessionId) {
  if (sessionId) {
    await deleteAdminSession(sessionId);
  }
}
