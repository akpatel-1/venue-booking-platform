import { vendorAuthStore } from '../vendor/vendor.auth.store';
import { vendorProfileStore } from '../vendor/vendor.profile.store';
import { userAuthStore } from './user.auth.store';

export function clearStoresByRole(role) {
  const normalizedRole = String(role || '').toLowerCase();

  userAuthStore.getState().clearSession();

  if (!normalizedRole || normalizedRole !== 'customer') {
    vendorAuthStore.getState().clearVendorSession();
    vendorProfileStore.getState().clear();
  }
}

export function clearAllStores() {
  userAuthStore.getState().clearSession();
  vendorAuthStore.getState().clearVendorSession();
  vendorProfileStore.getState().clear();
}
