import { createContext, useContext } from 'react';

export const DashboardThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

export const useDashboardTheme = () => useContext(DashboardThemeContext);
