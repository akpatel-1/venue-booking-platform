import { create } from 'zustand';

import { adminApi } from '../../api/admin.api';

const INITIAL_COUNTS = { pending: 0, approved: 0, rejected: 0 };

let overviewFetchPromise = null;

export const adminOverviewStore = create((set, get) => ({
  statusCounts: INITIAL_COUNTS,
  isLoading: false,
  hasFetched: false,

  fetchStatusCounts: async (force = false) => {
    const state = get();

    if (!force && state.hasFetched) {
      return state.statusCounts;
    }

    if (overviewFetchPromise) {
      return overviewFetchPromise;
    }

    set({ isLoading: true });

    overviewFetchPromise = Promise.all([
      adminApi.getStatusCount('pending'),
      adminApi.getStatusCount('approved'),
      adminApi.getStatusCount('rejected'),
    ])
      .then(([pendingRes, approvedRes, rejectedRes]) => {
        const counts = {
          pending: Number(pendingRes?.data?.count ?? 0),
          approved: Number(approvedRes?.data?.count ?? 0),
          rejected: Number(rejectedRes?.data?.count ?? 0),
        };

        set({
          statusCounts: counts,
          hasFetched: true,
          isLoading: false,
        });

        return counts;
      })
      .catch((error) => {
        set({ isLoading: false });
        throw error;
      })
      .finally(() => {
        overviewFetchPromise = null;
      });

    return overviewFetchPromise;
  },

  clearOverview: () =>
    set({
      statusCounts: INITIAL_COUNTS,
      isLoading: false,
      hasFetched: false,
    }),
}));
