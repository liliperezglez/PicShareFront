import React, { createContext, useContext, useState, useEffect } from 'react';

const THEME_KEY = 'theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isLightMode, setIsLightMode] = useState(() => {
    // Intenta obtener el valor del localStorage, si no, usa el valor predeterminado (false)
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Guarda el valor actual del tema en el localStorage cuando cambie
    localStorage.setItem(THEME_KEY, JSON.stringify(isLightMode));
  }, [isLightMode]);

  const contextValue = {
    isLightMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
