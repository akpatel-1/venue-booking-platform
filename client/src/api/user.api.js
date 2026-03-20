import { userClient } from '../lib/axios.instance';

export const userApi = {
  requestOtp: (data) => userClient.post('/auth/otp/request', data),
  resendOtp: (data) => userClient.post('/auth/otp/resend', data),
  verifyOtp: (data) => userClient.post('/auth/otp/verify', data),
  logout: () => userClient.post('/auth/logout'),
};
