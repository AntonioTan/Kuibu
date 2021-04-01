/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 14:36:02
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-24 13:35:49
 */
import React from 'react';
import VerticalTabs from './pages/LeftTabs';
import { themeContext } from '../utils/context';
import { theme as customTheme } from '../utils/globals';
// import { createStoreHook, Provider } from 'react-redux';

// const store = createStoreHook();

export default function Home() {
  return (
    <themeContext.Provider value={{ theme: customTheme }}>
      <div>
        <VerticalTabs />
      </div>
    </themeContext.Provider>
  );
}
