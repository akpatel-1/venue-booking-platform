import { FaGithub } from 'react-icons/fa6';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { LuBell } from 'react-icons/lu';

export default function HeaderLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
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
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
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
          className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700 transition-colors mr-5"
          title="View on GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700 transition-colors relative">
          <LuBell className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        {/* User Profile */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            SA
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-medium text-gray-900 leading-none">
              Akash patel
            </p>
            <p className="text-xs text-gray-500 mt-0.5">super_admin</p>
          </div>
          <HiOutlineChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
