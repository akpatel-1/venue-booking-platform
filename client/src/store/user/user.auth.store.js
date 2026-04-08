import { create } from 'zustand';

import { userApi } from '../../api/user.api';

let sessionCheckPromise = null;

export const userAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  hasCheckedSession: false,
  isChecking: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      hasCheckedSession: true,
    }),

  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
      hasCheckedSession: true,
    }),

  checkSessionCache: async (force = false) => {
    const { hasCheckedSession, isAuthenticated } = get();

    if (!force && hasCheckedSession) return isAuthenticated;
    if (!force && sessionCheckPromise) return sessionCheckPromise;

    set({ isChecking: true });

    sessionCheckPromise = userApi
      .checkSession()
      .then((response) => {
        const user = response?.data?.user || null;
        set({
          user,
          isAuthenticated: !!user,
          hasCheckedSession: true,
          isChecking: false,
        });
        return !!user;
      })
      .catch(() => {
        set({
          user: null,
          isAuthenticated: false,
          hasCheckedSession: true,
          isChecking: false,
        });
        return false;
      })
      .finally(() => {
        sessionCheckPromise = null;
      });

    return sessionCheckPromise;
  },

  requestOtp: async (payload) => userApi.requestOtp(payload),

  resendOtp: async (payload) => userApi.resendOtp(payload),

  verifyOtp: async (payload) => {
    const response = await userApi.verifyOtp(payload);
    set({
      user: null,
      isAuthenticated: true,
      hasCheckedSession: false,
    });
    return response;
  },

  logout: async () => {
    try {
      await userApi.logout();
    } catch (error) {
      if (error.response?.status >= 500) throw error;
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        hasCheckedSession: true,
      });
    }
  },
}));
