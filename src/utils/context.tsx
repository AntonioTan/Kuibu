/*
 * @Description: app的context集合位置
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 21:19:38
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-19 10:07:37
 */
import React from 'react';
import { theme as customTheme } from './globals';
const menuContext = React.createContext({
  services: ['Demo1', 'Demo2', 'Demo3'],
});
const themeContext = React.createContext({
  theme: customTheme,
});
export { menuContext, themeContext };
