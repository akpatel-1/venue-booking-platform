import { userClient } from '../lib/axios.instance';

export const vendorApi = {
  getApplicationStatus: (config = {}) =>
    userClient.get('/vendors/application/status', config),
  postVendorApplication: (data, config = {}) =>
    userClient.post('/vendors/application', data, config),
};
