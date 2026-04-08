import { redirect } from 'react-router-dom';

import { vendorApi } from '../api/vendor.api';

export async function vendorApplicationLoader() {
  try {
    const res = await vendorApi.getApplicationStatus();

    if (res.data.state === 'approved') {
      return redirect('/partners/overview');
    }

    if (res.data.state === 'not_applied') {
      return redirect('/partners/application');
    }

    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      return redirect(
        `/partners/landing?auth=1&redirect=${encodeURIComponent('/partners/application/status')}`
      );
    }

    if (err.response?.status === 403) {
      return redirect('/error/403');
    }

    throw err;
  }
}
