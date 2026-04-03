import { redirect } from 'react-router-dom';

import { adminAuthStore } from '../store/admin.auth.store';

const { hasCheckedSession, isAuthenticated, initializeSession } =
  adminAuthStore.getState();
export const adminAuthLoader = {
  protectedRoute: async () => {
    if (hasCheckedSession) {
      return isAuthenticated ? null : redirect('/admin/login');
    }

    const authenticated = await initializeSession();

    if (!authenticated) {
      return redirect('/admin/login');
    }

    return null;
  },

  publicRoute: async () => {
    if (hasCheckedSession) {
      return isAuthenticated ? redirect('/admin/overview') : null;
    }

    const authenticated = await initializeSession();

    if (authenticated) {
      return redirect('/admin/overview');
    }

    return null;
  },
};
