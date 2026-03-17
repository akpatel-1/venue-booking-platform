import { redirect } from 'react-router-dom';

import { vendorApi } from '../api/vendor.api';

export async function vendorApplicationLoader() {
  try {
    const res = await vendorApi.getKycStatus();

    if (res.data.state === 'approved') {
      return redirect('/partners/dashboard');
    }

    if (res.data.state === 'not_applied') {
      return redirect('/partners/application');
    }

    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      return redirect('/auth?redirect=/partners/application/status');
    }

    throw err;
  }
}
