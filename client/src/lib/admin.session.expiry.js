let onAdminSessionExpired = null;

export function setAdminSessionExpiredHandler(handler) {
  onAdminSessionExpired = typeof handler === 'function' ? handler : null;
}

export function runAdminSessionExpiredHandler() {
  if (typeof onAdminSessionExpired === 'function') {
    onAdminSessionExpired();
  }
}
