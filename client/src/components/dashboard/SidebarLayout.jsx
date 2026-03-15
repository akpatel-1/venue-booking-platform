import { IoLogOutOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

export default function SidebarLayout({ isOpen, links, onLogout }) {
  return (
    <nav
      className={`fixed md:relative h-full flex flex-col z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-60' : 'w-18'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 border-b border-gray-100 ${
          isOpen ? 'px-5' : 'justify-center'
        }`}
      >
        <div
          className="h-8 w-8 bg-contain shrink-0"
          style={{ backgroundImage: `url(${Logo})` }}
        />
        {isOpen && (
          <span className="ml-3 text-lg font-semibold text-gray-900">
            Venuz
          </span>
        )}
      </div>

      {/* Navigation Section */}
      {isOpen && (
        <div className="px-5 pt-6 pb-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Navigation
          </span>
        </div>
      )}

      {/* Navigation Links */}
      <ul
        className={`flex-1 space-y-2 overflow-y-auto ${isOpen ? 'px-3' : 'px-2'} ${!isOpen ? 'pt-4' : ''}`}
      >
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <li key={link.to}>
              <NavLink
                to={link.to}
                title={link.label}
                className={({ isActive }) =>
                  `group flex items-center rounded-lg transition-all duration-150 ${
                    isOpen ? 'px-3 py-2.5' : 'p-3 justify-center'
                  } ${
                    isActive
                      ? 'bg-gray-100 text-violet-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-violet-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent
                      className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-600' : 'text-gray-400 group-hover:text-violet-600'}`}
                    />
                    {isOpen && (
                      <span
                        className={`ml-3 text-sm ${isActive ? 'font-medium' : 'font-normal'}`}
                      >
                        {link.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className={`border-t border-gray-100 ${isOpen ? 'p-3' : 'p-2'}`}>
        <button
          onClick={onLogout}
          title="Logout"
          className={`group flex items-center w-full rounded-lg transition-all duration-150 text-red-500 hover:bg-red-100 hover:text-red-600 ${
            isOpen ? 'px-3 py-2.5' : 'p-3 justify-center'
          }`}
        >
          <IoLogOutOutline className="w-5 h-5 shrink-0 group-hover:text-red-500" />
          {isOpen && <span className="ml-3 text-sm">Logout</span>}
        </button>
      </div>
    </nav>
  );
}
