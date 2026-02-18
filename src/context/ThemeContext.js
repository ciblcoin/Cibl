export const NeonThemes = {
  CYAN: { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.5)' },
  PURPLE: { primary: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
  GREEN: { primary: '#22c55e', glow: 'rgba(34, 197, 94, 0.5)' },
  AMBER: { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' }
};

// در هر کجای اپلیکیشن، رنگ‌ها بر اساس این Context تغییر می‌کنند
const themeStyle = {
  color: currentTheme.primary,
  shadowColor: currentTheme.glow,
  shadowRadius: 10,
};


import React, { createContext, useState, useContext } from 'react';
import { Themes } from '../data/Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(Themes.cyan);

  const toggleTheme = (themeId) => {
    setCurrentTheme(Themes[themeId]);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
