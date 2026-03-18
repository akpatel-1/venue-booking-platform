import { useState } from 'react';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

export default function SidebarLayout({ isOpen, links, onLogout }) {
  const location = useLocation();

  return (
    <nav
      className={`fixed md:relative h-full flex flex-col z-40 bg-slate-50 border-r border-slate-200 transition-all duration-300 ease-in-out ${isOpen ? 'w-60' : 'w-18'}`}
    >
      {/* Brand Logo */}
      <div
        className={`flex items-center h-14 border-b  ${isOpen ? 'px-6' : 'justify-center'}`}
      >
        <img src={Logo} alt="Venuz" className="h-7 w-7" />
        {isOpen && (
          <span className="ml-3 text-xl font-bold tracking-tight text-slate-800">
            Venuz
          </span>
        )}
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        {isOpen && (
          <div className="px-6 mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Navigation
            </span>
          </div>
        )}

        <ul className={`space-y-1.5 ${isOpen ? 'px-4' : 'px-3'}`}>
          {links.map((link) => (
            <NavItem
              key={link.to}
              link={link}
              isOpen={isOpen}
              currentPath={location.pathname}
            />
          ))}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className={`p-4 border-t border-slate-200 bg-white/50`}>
        <button
          onClick={onLogout}
          className={`group flex items-center w-full rounded-xl transition-all duration-200 text-red-400 hover:bg-red-50 hover:text-red-500 ${isOpen ? 'px-4 py-2' : 'p-3 justify-center'}`}
        >
          <IoLogOutOutline className="w-5 h-5 shrink-0" />
          {isOpen && (
            <span className="ml-3 text-sm font-semibold">Sign Out</span>
          )}
        </button>
      </div>
    </nav>
  );
}

function NavItem({ link, isOpen, currentPath }) {
  const [isExpanded, setIsExpanded] = useState(currentPath.startsWith(link.to));
  const hasChildren = link.children && link.children.length > 0;
  const MainIcon = link.icon;
  const mainIconColor = link.color || '#64748b';

  const activeClass = isOpen
    ? 'bg-slate-200 text-slate-900 shadow-sm'
    : 'bg-slate-200 text-slate-900 ring-1 ring-slate-300';
  const inactiveClass =
    'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900';

  if (hasChildren && isOpen) {
    return (
      <li className="space-y-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
            isExpanded
              ? 'bg-slate-200/70 text-slate-900'
              : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center">
            <MainIcon className="h-5 w-5" style={{ color: mainIconColor }} />
            <span className="ml-3 text-sm font-medium">{link.label}</span>
          </div>
          <IoChevronDownOutline
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {isExpanded && (
          <ul className="ml-6 space-y-1 border-l border-slate-200">
            {link.children.map((child) => {
              const ChildIcon = child.icon;
              const childIconColor = child.color || mainIconColor;
              return (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    className={({ isActive }) =>
                      `flex items-center py-2.5 px-4 text-sm transition-all rounded-r-lg group/sub ${
                        isActive
                          ? 'text-slate-900 font-semibold border-l-2 border-slate-400 -ml-[1.5px] bg-slate-200/70'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`
                    }
                  >
                    {ChildIcon && (
                      <ChildIcon
                        className="mr-3 h-4 w-4 shrink-0 opacity-90"
                        style={{ color: childIconColor }}
                      />
                    )}
                    <span>{child.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `group flex items-center rounded-xl transition-all duration-200 ${
            isOpen ? 'px-4 py-3' : 'p-3  justify-center'
          } ${isActive ? activeClass : inactiveClass}`
        }
      >
        <MainIcon
          className="h-5 w-5 shrink-0"
          style={{ color: mainIconColor }}
        />
        {isOpen && (
          <span className="ml-3 text-sm font-medium">{link.label}</span>
        )}
      </NavLink>
    </li>
  );
}
