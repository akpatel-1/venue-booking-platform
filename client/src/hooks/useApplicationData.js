import { useCallback, useEffect, useState } from 'react';

import { adminApi } from '../api/admin.api';
import { application } from '../utils/application';

export function useApplicationData(status) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getApplication(status);
      const payload = res?.data ?? res;
      const apps = Array.isArray(payload?.applications)
        ? payload.applications
        : Array.isArray(payload?.applications)
          ? payload.applications
          : [];
      setApplications(application.normalizeApplications(apps, status));
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { applications, refresh: fetchData, loading };
}
