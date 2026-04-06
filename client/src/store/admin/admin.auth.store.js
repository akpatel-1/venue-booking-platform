import { create } from 'zustand';

import { adminApi } from '../../api/admin.api';

const store = (set, get) => ({
  user: null,

  async checkSessionCache() {
    const { user } = get();
    if (user) return true;

    try {
      const response = await adminApi.checkSession();
      const admin = response.data;
      set({ user: admin });
      return !!admin;
    } catch {
      set({ user: null });
      return false;
    }
  },

  async login(credentials) {
    try {
      const response = await adminApi.login(credentials);
      const user = response.data?.data || null;
      set({ user });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        serverError: error.response?.data?.message || 'Invalid credentials.',
        statusCode: error.response?.status,
      };
    }
  },

  async logout() {
    try {
      await adminApi.logout();
    } catch (error) {
      if (error.response?.status >= 500) throw error;
    } finally {
      set({ user: null });
    }
  },
});

export const adminAuthStore = create(store);
