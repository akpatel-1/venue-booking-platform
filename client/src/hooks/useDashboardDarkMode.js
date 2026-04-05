import { useEffect, useState } from 'react';

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false;

  const saved = localStorage.getItem('dashboardDarkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function useDashboardDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== 'dashboardDarkMode') return;
      if (event.newValue === null) return;
      setIsDarkMode(JSON.parse(event.newValue));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return isDarkMode;
}
