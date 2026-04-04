import { create } from 'zustand';

import { adminApi } from '../../api/admin.api';
import { application } from '../../utils/application';

const STATUSES = ['pending', 'approved', 'rejected'];

const INITIAL_BY_STATUS = {
  pending: [],
  approved: [],
  rejected: [],
};

const INITIAL_LOADING_BY_STATUS = {
  pending: false,
  approved: false,
  rejected: false,
};

const INITIAL_FETCHED_BY_STATUS = {
  pending: false,
  approved: false,
  rejected: false,
};

const inflightFetchByStatus = {
  pending: null,
  approved: null,
  rejected: null,
};

const isValidStatus = (status) => STATUSES.includes(status);

export const adminVendorKycStore = create((set, get) => ({
  applicationsByStatus: INITIAL_BY_STATUS,
  loadingByStatus: INITIAL_LOADING_BY_STATUS,
  hasFetchedByStatus: INITIAL_FETCHED_BY_STATUS,

  fetchApplicationsByStatus: async (status, force = false) => {
    const requestedStatus = isValidStatus(status) ? status : 'pending';
    const state = get();

    if (!force && state.hasFetchedByStatus[requestedStatus]) {
      return state.applicationsByStatus[requestedStatus];
    }

    if (inflightFetchByStatus[requestedStatus]) {
      return inflightFetchByStatus[requestedStatus];
    }

    set((prev) => ({
      loadingByStatus: {
        ...prev.loadingByStatus,
        [requestedStatus]: true,
      },
    }));

    inflightFetchByStatus[requestedStatus] = adminApi
      .getApplication(requestedStatus)
      .then((response) => {
        const payload = response?.data ?? response;
        const rawApplications = Array.isArray(payload?.applications)
          ? payload.applications
          : [];
        const normalizedApplications = application.normalizeApplications(
          rawApplications,
          requestedStatus
        );

        set((prev) => ({
          applicationsByStatus: {
            ...prev.applicationsByStatus,
            [requestedStatus]: normalizedApplications,
          },
          hasFetchedByStatus: {
            ...prev.hasFetchedByStatus,
            [requestedStatus]: true,
          },
          loadingByStatus: {
            ...prev.loadingByStatus,
            [requestedStatus]: false,
          },
        }));

        return normalizedApplications;
      })
      .catch((error) => {
        set((prev) => ({
          loadingByStatus: {
            ...prev.loadingByStatus,
            [requestedStatus]: false,
          },
        }));
        throw error;
      })
      .finally(() => {
        inflightFetchByStatus[requestedStatus] = null;
      });

    return inflightFetchByStatus[requestedStatus];
  },

  updateApplicationStatus: async (applicationId, data) => {
    await adminApi.updateStatus(applicationId, data);

    // Keep cache coherent after approve/reject actions.
    set({
      hasFetchedByStatus: INITIAL_FETCHED_BY_STATUS,
    });
  },

  clearKycCache: () =>
    set({
      applicationsByStatus: INITIAL_BY_STATUS,
      loadingByStatus: INITIAL_LOADING_BY_STATUS,
      hasFetchedByStatus: INITIAL_FETCHED_BY_STATUS,
    }),
}));
