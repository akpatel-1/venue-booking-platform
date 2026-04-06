import axios from 'axios';

import {
  ADMIN_OVERVIEW_PATH,
  ADMIN_SESSION_EXPIRED_PATH,
  isAdminAuthOrExpiryPath,
} from '../utils/admin.redirect';
import { runAdminSessionExpiredHandler } from './admin.session.expiry';

export const userClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export const adminClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

let isAdminRedirecting = false;

function getAdminReturnPath() {
  if (isAdminAuthOrExpiryPath(window.location.pathname)) {
    return ADMIN_OVERVIEW_PATH;
  }

  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

userClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (!original) {
      return Promise.reject(error);
    }

    if (original.url.includes('/auth/refresh')) {
      redirectToLogin(original.redirectPath);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        return userClient(original);
      } catch {
        if (!original.skipAuthRedirect) {
          redirectToLogin(original.redirectPath);
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

adminClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (!original) {
      return Promise.reject(error);
    }

    const requestUrl = String(original.url || '');
    const isAuthRequest =
      requestUrl.includes('/admin/auth/login') ||
      requestUrl.includes('/admin/auth/logout');
    const isProtectedRouteRedirectAllowed = !isAdminAuthOrExpiryPath(
      window.location.pathname
    );

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      isProtectedRouteRedirectAllowed
    ) {
      runAdminSessionExpiredHandler();

      if (!isAdminRedirecting) {
        isAdminRedirecting = true;
        const redirect = encodeURIComponent(getAdminReturnPath());
        window.location.replace(
          `${ADMIN_SESSION_EXPIRED_PATH}?redirect=${redirect}`
        );
      }
    }

    return Promise.reject(error);
  }
);

function redirectToLogin(redirectPath) {
  const redirect =
    redirectPath ||
    window.location.pathname + window.location.search + window.location.hash;

  window.location.replace(`/auth?redirect=${encodeURIComponent(redirect)}`);
}
