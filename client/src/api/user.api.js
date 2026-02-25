import { axiosClient } from '../lib/axios.client';

export const userApi = {
  requestOtp: (data) => axiosClient.post('/auth/otp/request', data),
  verifyOtp: (data) => axiosClient.post('/auth/otp/verify', data),
};
