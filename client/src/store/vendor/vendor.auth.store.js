import { create } from 'zustand';

import { vendorApi } from '../../api/vendor.api';

let vendorSessionCheckPromise = null;

export const vendorAuthStore = create((set, get) => ({
  vendor: null,
  isVendor: false,
  hasCheckedVendorSession: false,
  isChecking: false,
  lastErrorStatus: null,

  setVendor: (vendor) =>
    set({
      vendor,
      isVendor: vendor?.role === 'vendor',
      hasCheckedVendorSession: true,
      lastErrorStatus: null,
    }),

  clearVendorSession: () =>
    set({
      vendor: null,
      isVendor: false,
      hasCheckedVendorSession: true,
      isChecking: false,
      lastErrorStatus: null,
    }),

  checkVendorSessionCache: async (force = false) => {
    const { hasCheckedVendorSession, isVendor } = get();

    if (!force && hasCheckedVendorSession) return isVendor;
    if (!force && vendorSessionCheckPromise) return vendorSessionCheckPromise;

    set({ isChecking: true, lastErrorStatus: null });

    vendorSessionCheckPromise = vendorApi
      .getMe({ skipAuthRedirect: true })
      .then((response) => {
        const vendor = response?.data?.data || response?.data || null;
        const isVendorRole = vendor?.role === 'vendor';

        set({
          vendor: isVendorRole ? vendor : null,
          isVendor: isVendorRole,
          hasCheckedVendorSession: true,
          isChecking: false,
          lastErrorStatus: isVendorRole ? null : 403,
        });

        return isVendorRole;
      })
      .catch((error) => {
        const status = error.response?.status || null;

        set({
          vendor: null,
          isVendor: false,
          hasCheckedVendorSession: true,
          isChecking: false,
          lastErrorStatus: status,
        });

        if (status === 401 || status === 403) return false;
        throw error;
      })
      .finally(() => {
        vendorSessionCheckPromise = null;
      });

    return vendorSessionCheckPromise;
  },
}));
