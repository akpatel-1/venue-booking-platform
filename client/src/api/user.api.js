import { axiosClient } from '../lib/axios.instance';

export const userApi = {
  requestOtp: (data) => axiosClient.post('/auth/otp/request', data),
  resendOtp: (data) => axiosClient.post('/auth/otp/resend', data),
  verifyOtp: (data) => axiosClient.post('/auth/otp/verify', data),
};
