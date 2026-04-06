import { redirect } from 'react-router-dom';

import { userAuthStore } from '../store/user/user.auth.store';

export async function userProtected() {
  const isVerified = await userAuthStore.getState().checkSessionCache();

  if (!isVerified) {
    const redirectPath =
      window.location.pathname + window.location.search + window.location.hash;
    return redirect(
      `/partners?auth=1&redirect=${encodeURIComponent(redirectPath)}`
    );
  }

  return null;
}
