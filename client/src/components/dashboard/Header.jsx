import {
  Bell,
  ChevronDown,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
} from 'lucide-react';

import Logo from '../../assets/logo.svg';

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  isDarkMode,
  onToggleDarkMode,
}) {
  return (
    <header
      className={`sticky top-0 z-20 flex h-14 w-full items-center gap-2 border-b px-4 ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-200 bg-white'
      }`}
    >
      {/* Left Section */}
      <div className="z-10 flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`rounded-md p-2 transition-colors ${
            isDarkMode
              ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Center - Search */}
      <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search venues, vendors, reports..."
            className={`w-full rounded-lg border py-2 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 ${
              isDarkMode
                ? 'border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-indigo-400 focus:bg-slate-800'
                : 'border-slate-200 bg-slate-50 text-slate-700 focus:border-indigo-400 focus:bg-white'
            }`}
          />
          <kbd
            className={`absolute right-3 top-1/2 hidden -translate-y-1/2 items-center rounded border px-1.5 py-0.5 text-[10px] font-medium lg:inline-flex ${
              isDarkMode
                ? 'border-slate-700 bg-slate-800 text-slate-500'
                : 'border-slate-200 bg-slate-100 text-slate-400'
            }`}
          >
            ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={onToggleDarkMode}
          className={`rounded-md p-2 transition-colors ${
            isDarkMode
              ? 'text-amber-300 hover:bg-slate-800 hover:text-amber-200'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={2} />
          )}
        </button>

        {/* Notifications */}
        <button
          className={`relative rounded-md p-2 transition-colors ${
            isDarkMode
              ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div
          className={`mx-2 h-6 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}
        />

        {/* User Profile */}
        <button
          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
            isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg  ">
            <img src={Logo} alt="Venuz" className="h-6 w-6" />
          </div>
          <div className="hidden lg:block text-left">
            <p
              className={`text-sm font-semibold leading-none ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              Akash patel
            </p>
            <p
              className={`mt-0.5 text-xs ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              super_admin
            </p>
          </div>
          <ChevronDown
            className={`hidden h-4 w-4 lg:block ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          />
        </button>
      </div>
    </header>
  );
}
