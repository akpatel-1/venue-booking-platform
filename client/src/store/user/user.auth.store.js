import { create } from 'zustand';

import { userApi } from '../../api/user.api';

let sessionCheckPromise = null;

export const userAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isChecking: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isChecking: false,
    }),

  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
      isChecking: false,
    }),

  requestOtp: async (payload) => {
    return userApi.requestOtp(payload);
  },

  resendOtp: async (payload) => {
    return userApi.resendOtp(payload);
  },

  verifyOtp: async (payload) => {
    const response = await userApi.verifyOtp(payload);
    set({ isAuthenticated: true });
    return response;
  },

  checkSession: async (force = false) => {
    if (!force && sessionCheckPromise) {
      return sessionCheckPromise;
    }

    set({ isChecking: true });

    sessionCheckPromise = userApi
      .checkSession()
      .then((response) => {
        const user = response?.data?.data || null;
        set({
          user,
          isAuthenticated: !!user,
          isChecking: false,
        });
        return !!user;
      })
      .catch(() => {
        set({
          user: null,
          isAuthenticated: false,
          isChecking: false,
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
      await userApi.logout();
    } catch (error) {
      if (error.response?.status >= 500) {
        throw error;
      }
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isChecking: false,
      });
    }
  },
}));
