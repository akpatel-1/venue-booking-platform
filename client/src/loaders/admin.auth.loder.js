import { redirect } from 'react-router-dom';

import { adminAuthStore } from '../store/admin/admin.auth.store';

export const adminAuthLoader = {
  protectedRoute: async () => {
    const { hasCheckedSession, isAuthenticated, initializeSession } =
      adminAuthStore.getState();

    if (hasCheckedSession) {
      return isAuthenticated ? null : redirect('/admin/login');
    }

    const authenticated = await initializeSession();
    return authenticated ? null : redirect('/admin/login');
  },
};
