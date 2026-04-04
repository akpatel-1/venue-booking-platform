import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ChevronDown, LogOut } from 'lucide-react';

import Logo from '../../assets/logo.svg';

export default function Sidebar({ isOpen, links, onLogout, isDarkMode }) {
  const location = useLocation();

  return (
    <nav
      className={`fixed z-40 flex h-full flex-col border-r shadow-sm transition-all duration-300 ease-in-out md:relative ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-200/90 bg-white'
      } ${isOpen ? 'w-60' : 'w-20'}`}
    >
      {/* Brand Logo */}
      <div
        className={`flex h-14 items-center border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200/80'
        } ${isOpen ? 'px-6' : 'justify-center'}`}
      >
        <img src={Logo} alt="Vyra" className="h-7 w-7" />
        {isOpen && (
          <span
            className={`ml-3 text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-800'
            }`}
          >
            Vyra<span className="text-red-500">.</span>
          </span>
        )}
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        {isOpen && (
          <div className="px-6 mb-4">
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
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
              currentSearch={location.search}
              isDarkMode={isDarkMode}
            />
          ))}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div
        className={`border-t p-4 ${
          isDarkMode
            ? 'border-slate-800 bg-slate-950/60'
            : 'border-slate-200/80 bg-slate-50/60'
        }`}
      >
        <button
          onClick={onLogout}
          aria-label="Logout"
          className={`group flex min-h-11 w-full items-center rounded-xl text-rose-500 transition-all duration-200 hover:text-rose-600 ${
            isDarkMode ? 'hover:bg-rose-500/10' : 'hover:bg-rose-50'
          } ${isOpen ? 'px-4' : 'justify-center px-0'}`}
        >
          <LogOut className="w-5 h-5 shrink-0" strokeWidth={2} />
          {isOpen && (
            <span className="ml-3 text-sm font-semibold">Sign Out</span>
          )}
        </button>
      </div>
    </nav>
  );
}

function NavItem({ link, isOpen, currentPath, currentSearch, isDarkMode }) {
  const hasChildren = link.children && link.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const MainIcon = link.icon;

  const isRouteMatch = (to) => {
    const url = new URL(to, 'http://localhost');
    const currentParams = new URLSearchParams(currentSearch);

    if (currentPath !== url.pathname) {
      return false;
    }

    if (!url.search) {
      return true;
    }

    for (const [key, value] of url.searchParams.entries()) {
      if (currentParams.get(key) !== value) {
        return false;
      }
    }

    return true;
  };

  const hasActiveChild = hasChildren
    ? link.children.some((child) => isRouteMatch(child.to))
    : false;

  const shouldShowChildren = hasActiveChild || isExpanded;
  const isMainActive = isRouteMatch(link.to);

  const activeClass = isOpen
    ? isDarkMode
      ? 'bg-indigo-500/15 text-indigo-300 shadow-sm ring-1 ring-indigo-500/30'
      : 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
    : isDarkMode
      ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30'
      : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200';
  const inactiveClass = isDarkMode
    ? 'text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-300'
    : 'text-slate-600 hover:bg-indigo-50/80 hover:text-indigo-700';

  if (hasChildren && isOpen) {
    return (
      <li className="space-y-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
            hasActiveChild
              ? isDarkMode
                ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30'
                : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
              : isDarkMode
                ? 'text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-300'
                : 'text-slate-600 hover:bg-indigo-50/80 hover:text-indigo-700'
          }`}
        >
          <div className="flex items-center">
            <MainIcon
              className={`h-5 w-5 shrink-0 ${
                hasActiveChild
                  ? isDarkMode
                    ? 'text-indigo-300'
                    : 'text-indigo-600'
                  : isDarkMode
                    ? 'text-slate-400 group-hover:text-indigo-300'
                    : 'text-slate-500 group-hover:text-indigo-600'
              }`}
              strokeWidth={2}
            />
            <span className="ml-3 text-sm font-medium">{link.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveChild && (
              <span
                className="h-2 w-2 rounded-full bg-indigo-500"
                aria-hidden="true"
              />
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${shouldShowChildren ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </div>
        </button>

        {shouldShowChildren && (
          <ul
            className={`ml-6 space-y-1 border-l ${
              isDarkMode ? 'border-indigo-500/30' : 'border-indigo-100'
            }`}
          >
            {link.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = isRouteMatch(child.to);

              return (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    className={`flex items-center py-2.5 px-4 text-sm transition-all rounded-r-lg group/sub ${
                      isChildActive
                        ? isDarkMode
                          ? 'text-indigo-300 font-semibold border-l-2 border-indigo-400 -ml-[1.5px] bg-indigo-500/10'
                          : 'text-indigo-700 font-semibold border-l-2 border-indigo-500 -ml-[1.5px] bg-indigo-50'
                        : isDarkMode
                          ? 'text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10'
                          : 'text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80'
                    }`}
                  >
                    {ChildIcon && (
                      <ChildIcon
                        className={`mr-3 h-4 w-4 shrink-0 opacity-90 ${
                          isChildActive
                            ? isDarkMode
                              ? 'text-indigo-300'
                              : 'text-indigo-600'
                            : isDarkMode
                              ? 'text-slate-400 group-hover/sub:text-indigo-300'
                              : 'text-slate-500 group-hover/sub:text-indigo-600'
                        }`}
                        strokeWidth={2}
                      />
                    )}
                    <span>{child.label}</span>
                    {isChildActive && (
                      <span
                        className="ml-auto h-2 w-2 rounded-full bg-indigo-500"
                        aria-hidden="true"
                      />
                    )}
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
        className={() =>
          `group flex items-center rounded-xl transition-all duration-200 ${
            isOpen ? 'px-4 py-3' : 'p-3  justify-center'
          } ${isMainActive ? activeClass : inactiveClass}`
        }
      >
        <MainIcon
          className={`h-5 w-5 shrink-0 ${
            isMainActive
              ? isDarkMode
                ? 'text-indigo-300'
                : 'text-indigo-600'
              : isDarkMode
                ? 'text-slate-400 group-hover:text-indigo-300'
                : 'text-slate-500 group-hover:text-indigo-600'
          }`}
          strokeWidth={2}
        />
        {isOpen && (
          <span className="ml-3 text-sm font-medium">{link.label}</span>
        )}
        {isOpen && isMainActive && (
          <span
            className="ml-auto h-2 w-2 rounded-full bg-indigo-500"
            aria-hidden="true"
          />
        )}
      </NavLink>
    </li>
  );
}
