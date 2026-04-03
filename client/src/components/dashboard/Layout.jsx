import { useEffect, useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const getInitialSidebarState = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('sidebarOpen');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  return window.innerWidth >= 768;
};

export default function Layout({ sidebarLinks, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* 1. Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} links={sidebarLinks} onLogout={onLogout} />

      {/* 2. Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
