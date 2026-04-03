import { adminClient } from '../lib/axios.instance';

export const adminApi = {
  login: (data) => adminClient.post('/admin/auth/login', data),
  checkSession: () => adminClient.get('/admin/auth/me'),
  logout: () => adminClient.post('/admin/auth/logout'),

  getApplication: (status = 'pending') =>
    adminClient.get(`/admin/application?status=${status}`),

  updateStatus: (id, data) =>
    adminClient.patch(`/admin/application/${id}`, data),

  getStatusCount: (status) => adminClient.get(`/admin/application/${status}`),
};
