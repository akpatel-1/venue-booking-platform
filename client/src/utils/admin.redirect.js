export const ADMIN_OVERVIEW_PATH = '/admin/overview';
export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_SESSION_EXPIRED_PATH = '/admin/session-expired';

export function isAdminAuthOrExpiryPath(pathname) {
  return (
    pathname === ADMIN_LOGIN_PATH || pathname === ADMIN_SESSION_EXPIRED_PATH
  );
}

export function getSafeAdminRedirect(path, fallback = ADMIN_OVERVIEW_PATH) {
  if (!path || !path.startsWith('/admin')) {
    return fallback;
  }

  if (
    path.startsWith(ADMIN_LOGIN_PATH) ||
    path.startsWith(ADMIN_SESSION_EXPIRED_PATH)
  ) {
    return fallback;
  }

  return path;
}
