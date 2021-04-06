/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 00:10:52
 */
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { menuContext } from './utils/context';

const services = {
  services: ['Demo1', 'Demo2', 'Demo3'],
};
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
// render(<DatePicker />, document.getElementById('root'));
render(
  <menuContext.Provider value={services}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </menuContext.Provider>,
  document.getElementById('root')
);
