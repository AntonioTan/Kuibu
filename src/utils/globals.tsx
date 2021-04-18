/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 22:00:06
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-17 16:38:57
 */
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, Theme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[100],
    },
    secondary: {
      main: green[500],
    },
    divider: purple[500],
    background: {
      paper: red[500],
    },
  },
});
const services = ['service1', 'service2', 'service3', 'service4'];
export { services, theme };
const serverAddress = 'http://127.0.0.1:8080';
export { serverAddress };
export const myUserID: string = 'aaaaaaaaaa';
