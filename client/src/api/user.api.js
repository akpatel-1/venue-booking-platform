import { axiosClient } from '../lib/axios.client';

export const userApi = {
  signup: (data) => axiosClient.post('/auth/signup/email', data),
  pendingStatus: () => axiosClient.get('/auth/pending-status'),
};
