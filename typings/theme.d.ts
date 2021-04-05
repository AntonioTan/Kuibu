/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-04 23:22:41
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-05 00:34:33
 */
import Palette from '@material-ui/core';
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    title: Palette['primary'];
    textPrimary: Palette['primary'];
  }
  interface PaletteOptions {
    title?: PaletteOptions['primary'];
    textPrimary?: PaletteOptions['primary'];
  }
}
