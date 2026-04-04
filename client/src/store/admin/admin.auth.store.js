import { create } from 'zustand';

import { adminApi } from '../../api/admin.api';

let sessionCheckPromise = null;

export const adminAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isChecking: true,
  hasCheckedSession: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isChecking: false,
      hasCheckedSession: true,
    }),

  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
      isChecking: false,
      hasCheckedSession: true,
    }),

  login: async (credentials) => {
    try {
      const response = await adminApi.login(credentials);

      if (response.status === 200) {
        const user = response.data?.data || null;
        set({
          user,
          isAuthenticated: !!user,
          isChecking: false,
          hasCheckedSession: true,
        });
        return { success: true, user };
      }
    } catch (error) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message;

      return {
        success: false,
        serverError: errorMessage || 'Invalid credentials or connection issue.',
        statusCode: status,
      };
    }
  },

  initializeSession: async (force = false) => {
    const state = get();

    if (!force && state.hasCheckedSession) {
      return state.isAuthenticated;
    }

    if (sessionCheckPromise) {
      return sessionCheckPromise;
    }

    set({ isChecking: true });

    sessionCheckPromise = adminApi
      .checkSession()
      .then((response) => {
        const admin = response?.data?.admin || null;
        set({
          user: admin,
          isAuthenticated: !!admin,
          isChecking: false,
          hasCheckedSession: true,
        });
        return !!admin;
      })
      .catch(() => {
        set({
          user: null,
          isAuthenticated: false,
          isChecking: false,
          hasCheckedSession: true,
        });
        return false;
      })
      .finally(() => {
        sessionCheckPromise = null;
      });

    return sessionCheckPromise;
  },

  logout: async () => {
    try {
      await adminApi.logout();
    } catch (error) {
      if (error.response?.status >= 500) {
        throw error;
      }
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isChecking: false,
        hasCheckedSession: true,
      });
    }
  },
}));
