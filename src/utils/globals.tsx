/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 22:00:06
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-19 13:21:13
 */
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, Theme } from '@material-ui/core';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
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