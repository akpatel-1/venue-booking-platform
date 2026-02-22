import { axiosClient } from '../lib/axios.client';

export const userApi = {
  signup: (data) => axiosClient.post('/auth/signup/email', data),
  me: () => axiosClient.get('/me'),
  refresh: () => axiosClient.post('/auth/refresh'),
};
