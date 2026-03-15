import { adminClient } from '../lib/axios.instance';

export const adminApi = {
  login: (data) => adminClient.post('/admin/login', data),
  checkSession: () => adminClient.get('/admin/session'),
  logout: () => adminClient.post('/admin/logout'),
};
