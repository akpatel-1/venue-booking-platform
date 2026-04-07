import { create } from 'zustand';

import { userClient } from '../../../lib/axios.instance';

function normalizeProfile(raw) {
  if (!raw) return null;

  return {
    id: raw.id || raw.user_id || '',
    displayName: raw.vendor_name || raw.name || '',
    email: raw.email || '',
    role: raw.role || 'vendor',
    status: raw.status || 'active',
    isSuspended: Boolean(raw.is_suspended ?? raw.isSuspended),
    suspensionReason: raw.suspension_reason || raw.suspensionReason || '',
    phone: raw.phone || '-',
    city: raw.city || raw.district || '-',
    state: raw.state || '-',
    createdAt: raw.created_at || raw.createdAt || null,
  };
}

export const vendorProfileStore = create((set, get) => ({
  profile: null,
  isLoading: false,
  hasLoaded: false,
  error: '',

  clear: () =>
    set({
      profile: null,
      isLoading: false,
      hasLoaded: false,
      error: '',
    }),

  fetchProfile: async (force = false) => {
    const { hasLoaded, profile } = get();

    if (!force && hasLoaded && profile) {
      return profile;
    }

    set({ isLoading: true, error: '' });

    try {
      const response = await userClient.get('/vendors/profile');
      const payload = response?.data?.data || response?.data || null;
      const normalized = normalizeProfile(payload);

      set({
        profile: normalized,
        isLoading: false,
        hasLoaded: true,
        error: '',
      });

      return normalized;
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Failed to load profile';
      set({
        isLoading: false,
        hasLoaded: true,
        error: message,
      });
      throw error;
    }
  },
}));
