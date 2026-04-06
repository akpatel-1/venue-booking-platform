import { userClient } from '../lib/axios.instance';

export const vendorApi = {
  getKycStatus: (config = {}) =>
    userClient.get('/vendors/application/status', config),
  postKycApplication: (data, config = {}) =>
    userClient.post('/vendors/application', data, config),
};
