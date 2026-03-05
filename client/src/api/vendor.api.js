import { axiosClient } from '../lib/axios.instance';

export const vendorApi = {
  verifyStatus: () => axiosClient.get('/partners/application/status'),
};
