import { axiosClient } from '../lib/axios.instance';

export const vendorApi = {
  getApplicationStatus: () => axiosClient.get('/partners/application/status'),
  postApplication: (data) =>
    axiosClient.post('/partners/application/apply', data),
};
