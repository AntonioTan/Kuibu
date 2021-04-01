/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-24 12:58:53
 */
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { menuContext } from './utils/context';

const services = {
  services: ['Demo1', 'Demo2', 'Demo3'],
};
// render(<DatePicker />, document.getElementById('root'));
render(
  <menuContext.Provider value={services}>
    <App />
  </menuContext.Provider>,
  document.getElementById('root')
);
