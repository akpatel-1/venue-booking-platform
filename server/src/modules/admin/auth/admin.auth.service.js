import argon2 from 'argon2';

import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { repository } from '../session/admin.session.repository.js';
import { findAdminByEmail } from './admin.auth.repository.js';

export const service = {
  async authenticateAdmin({ email, password }, oldSessionId) {
    if (oldSessionId) {
      await repository.delete(oldSessionId);
    }

    const admin = await this._verifyAdminCredentials(email, password);

    const sessionId = await repository.create(admin.id, admin.role);

    return {
      sessionId,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    };
  },

  async terminateAdminSession(sessionId) {
    if (sessionId) {
      await repository.delete(sessionId);
    }
  },

  async _verifyAdminCredentials(email, password) {
    const admin = await findAdminByEmail(email);

    if (!admin) {
      throw new ApiError(ERROR_CONFIG.INVALID_CREDENTIALS);
    }

    const isMatch = await argon2.verify(admin.password_hash, password);

    if (!isMatch) {
      throw new ApiError(ERROR_CONFIG.INVALID_CREDENTIALS);
    }

    return admin;
  },
};
