import { useEffect, useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardThemeContext } from './dashboard.theme.context';

const getInitialSidebarState = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('sidebarOpen');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  return window.innerWidth >= 768;
};

const getInitialDashboardTheme = () => {
  if (typeof window === 'undefined') return false;

  const saved = localStorage.getItem('dashboardDarkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function Layout({ sidebarLinks, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDashboardTheme);

  const toggleDarkMode = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-switching');
    }

    setIsDarkMode((prev) => !prev);

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.documentElement.classList.remove('theme-switching');
        });
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('dashboardDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <DashboardThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div
        className={`relative flex h-screen overflow-hidden ${
          isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
        }`}
      >
        {/* 1. Sidebar Component */}
        <Sidebar
          isOpen={sidebarOpen}
          links={sidebarLinks}
          onLogout={onLogout}
          isDarkMode={isDarkMode}
        />

        {/* 2. Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 3. Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          <main
            className={`flex-1 overflow-auto p-6 ${
              isDarkMode ? 'bg-slate-950' : 'bg-slate-50/30'
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </DashboardThemeContext.Provider>
  );
}
