/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 14:36:02
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-05 22:47:29
 */
import React from 'react';
import VerticalTabs from './pages/LeftTabs';
import { themeContext } from '../utils/context';
import { theme as customTheme } from '../utils/globals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// import { createStoreHook, Provider } from 'react-redux';

// const store = createStoreHook();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f7385',
    },
    secondary: {
      main: '#d7ebed',
    },
    textPrimary: {
      main: '#d7ebed',
    },
  },
});
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <VerticalTabs />
      </div>
    </ThemeProvider>
  );
}
