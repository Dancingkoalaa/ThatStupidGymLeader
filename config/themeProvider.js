import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { darkTheme, defaultTheme } from './theme';

//* Changing between dark and light themes, also putting it in Async
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  //Look at what the current theme is to allow the change
  const findOldTheme = async () => {
    const themeMode = await AsyncStorage.getItem('themeMode');
    if (themeMode !== null) {
      themeMode === 'default' ? setTheme(defaultTheme) : setTheme(darkTheme);
      setIsLoadingTheme(false);
    }
    setIsLoadingTheme(false);
  };

  useEffect(() => {
    findOldTheme();
  }, []);

  //Change the theme of the page to the non-active theme
  const updateTheme = currentThemeMode => {
    const newTheme = currentThemeMode === 'default' ? darkTheme : defaultTheme;
    setTheme(newTheme);
    AsyncStorage.setItem('themeMode', newTheme.themeMode);
  };

  //Returns the theme
  return (
    <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({
  container: {},
});

//Export the ThemeProvider so it can be found by the App.js file
export default ThemeProvider;