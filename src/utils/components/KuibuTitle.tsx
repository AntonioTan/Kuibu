/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 22:52:00
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 00:37:06
 */

import { Typography } from '@material-ui/core';
import React from 'react';

export const KuibuTitle = () => {
  return (
    <Typography
      align="center"
      variant="h6"
      style={{
        marginLeft: '30px',
        userSelect: 'none',
        width: 900,
        color: '#d7ebed',
      }}
      noWrap
    >
      跬步
    </Typography>
  );
};
