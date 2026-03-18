import { FaGithub } from 'react-icons/fa6';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { LuBell } from 'react-icons/lu';

import Logo from '../../assets/logo.svg';

export default function HeaderLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-4">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <GoSidebarCollapse className="w-5 h-5" />
          ) : (
            <GoSidebarExpand className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Center - Search */}
      <div className="mx-8 hidden max-w-md flex-1 md:flex">
        <div className="relative w-full">
          <IoIosSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline-flex">
            ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1">
        {/* GitHub */}
        <a
          // href='https://github.com/akpatel-1/venue-booking-platform'
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          title="View on GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>

        {/* Notifications */}
        <button className="relative rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <LuBell className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-slate-200" />

        {/* User Profile */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg  ">
            <img src={Logo} alt="Venuz" className="h-6 w-6" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold leading-none text-slate-900">
              Akash patel
            </p>
            <p className="mt-0.5 text-xs text-slate-500">super_admin</p>
          </div>
          <HiOutlineChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
        </button>
      </div>
    </header>
  );
}
