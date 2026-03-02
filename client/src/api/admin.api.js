import { axiosClient } from '../lib/axios.instance';

export const adminApi = {
  login: (data) => axiosClient.post('/admin/login', data),
  checkSession: () => axiosClient.get('/admin/auth/session'),
  logout: () => axiosClient.post('/admin/logout'),
};
