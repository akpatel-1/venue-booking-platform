import { userClient } from '../lib/axios.instance';

export const vendorApi = {
  getApplicationStatus: () => userClient.get('/partners/application/status'),
  postApplication: (data) =>
    userClient.post('/partners/application/apply', data),
};
