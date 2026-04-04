import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { adminApi } from '../api/admin.api';
import { application } from '../utils/application';

export function useApplicationData(status) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataStatus, setDataStatus] = useState(status);
  const lastRequestIdRef = useRef(0);

  useLayoutEffect(() => {
    // Clear previous tab rows before paint to avoid status-switch flashing.
    setApplications([]);
    setDataStatus('');
    setLoading(true);
  }, [status]);

  const fetchData = useCallback(async () => {
    const requestId = ++lastRequestIdRef.current;

    setLoading(true);
    try {
      const res = await adminApi.getApplication(status);
      const payload = res?.data ?? res;
      const apps = Array.isArray(payload?.applications)
        ? payload.applications
        : Array.isArray(payload?.applications)
          ? payload.applications
          : [];

      // Ignore stale responses when user switches status quickly.
      if (requestId !== lastRequestIdRef.current) {
        return;
      }

      setApplications(application.normalizeApplications(apps, status));
      setDataStatus(status);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      if (requestId === lastRequestIdRef.current) {
        setLoading(false);
      }
    }
  }, [status]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    applications,
    refresh: fetchData,
    loading,
    isDataForCurrentStatus: dataStatus === status,
  };
}
