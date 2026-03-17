import { userClient } from '../lib/axios.instance';

export const vendorApi = {
  getKycStatus: (config = {}) =>
    userClient.get('/partners/application/status', config),
  postKycApplication: (data, config = {}) =>
    userClient.post('/partners/application', data, config),
};
