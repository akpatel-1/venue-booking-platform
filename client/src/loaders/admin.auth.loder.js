import { redirect } from 'react-router-dom';

import { adminApi } from '../api/admin.api';

export const adminAuthLoader = {
  protectedRoute: async () => {
    try {
      await adminApi.checkSession();
      return null;
    } catch {
      return redirect('/admin/login');
    }
  },

  publicRoute: async () => {
    try {
      await adminApi.checkSession();
      return redirect('/admin/dashboard');
    } catch {
      return null;
    }
  },
};
