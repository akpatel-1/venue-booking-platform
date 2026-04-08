import { redirect } from 'react-router-dom';

import { userAuthStore } from '../store/user/user.auth.store';

export async function vendorProtected() {
  const authState = userAuthStore.getState();
  const isVerified = await authState.checkSessionCache();
  const { user } = userAuthStore.getState();
  const isVendor = user?.role === 'vendor';

  if (!isVerified || !isVendor) {
    const redirectPath =
      window.location.pathname + window.location.search + window.location.hash;

    return redirect(`/auth?redirect=${encodeURIComponent(redirectPath)}`);
  }

  return null;
}
