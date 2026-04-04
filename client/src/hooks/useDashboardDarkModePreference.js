import { useEffect, useState } from 'react';

const getInitialDarkModePreference = () => {
  if (typeof window === 'undefined') return false;

  const saved = localStorage.getItem('dashboardDarkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function useDashboardDarkModePreference() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkModePreference);

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
