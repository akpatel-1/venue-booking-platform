import { userClient } from '../lib/axios.instance';

export const vendorApi = {
  getApplicationStatus: (config = {}) =>
    userClient.get('/partners/application/status', config),
  postApplication: (data, config = {}) =>
    userClient.post('/partners/application/apply', data, config),
};
