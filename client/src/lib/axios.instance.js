import axios from 'axios';

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
        redirectToLogin(original.redirectPath);
        return Promise.reject(error);
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
