import { axiosClient } from '../lib/axios.client';

export const userApi = {
  handleOtpRequest: (data) => axiosClient.post('/auth/otp/request', data),
};
