import { redirect } from 'react-router-dom';

import { adminAuthStore } from '../store/admin/admin.auth.store';

export async function adminProtected() {
  const authenticated = await adminAuthStore.getState().checkSessionCache();
  return authenticated ? null : redirect('/admin/login');
}
