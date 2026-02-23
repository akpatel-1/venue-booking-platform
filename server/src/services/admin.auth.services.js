import argon2 from 'argon2';

import {
  createAdminSession,
  deleteAdminSession,
} from '../infrastructure/admin.redis.session.js';
import { findAdminByEmail } from '../models/admin.auth.model.js';
import { ApiError } from '../utils/api.error.utils.js';

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
  if (!admin) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await argon2.verify(admin.password_hash, password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

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
