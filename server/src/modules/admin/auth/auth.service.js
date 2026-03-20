import argon2 from 'argon2';

import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';
import { repository } from '../session/session.repository.js';
import { findAdminByEmail } from './auth.repository.js';

export const service = {
  async loginAdmin({ email, password }, oldSessionId) {
    const admin = await this._authenticateAdmin(email, password);

    if (oldSessionId) {
      const session = await repository.get(oldSessionId);

      if (session && session.adminId === admin.id) {
        await repository.delete(oldSessionId);
      }
    }

    const sessionId = await repository.create(admin.id);

    return {
      sessionId,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  },

  async logoutAdmin(sessionId) {
    if (sessionId) {
      await repository.delete(sessionId);
    }
  },

  async _authenticateAdmin(email, password) {
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
