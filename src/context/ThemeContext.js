import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../data/Themes';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@cibl_user_theme';

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(Themes.cyan);
  const [loading, setLoading] = useState(true);

  // لود کردن تم ذخیره شده هنگام اجرای اپلیکیشن
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedThemeId = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeId && Themes[savedThemeId]) {
          setCurrentTheme(Themes[savedThemeId]);
        }
      } catch (e) {
        console.log("Failed to load theme", e);
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  // تابع تغییر تم و ذخیره همزمان در حافظه
  const toggleTheme = async (themeId) => {
    try {
      setCurrentTheme(Themes[themeId]);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {
      console.log("Failed to save theme", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../data/Themes';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@cibl_user_theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Themes.cyan);
  const [isThemeLoading, setIsThemeLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedThemeId = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeId && Themes[savedThemeId]) {
          setTheme(Themes[savedThemeId]);
        }
      } catch (e) {
        console.error("Theme Loading Error:", e);
      } finally {
        setIsThemeLoading(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (themeId) => {
    if (Themes[themeId]) {
      setTheme(Themes[themeId]);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

