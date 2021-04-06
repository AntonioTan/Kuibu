/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 23:57:26
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 00:08:48
 */

import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import { KuibuAppBar } from '../../utils/components/KuibuAppBar';

export const HomePage = () => {
  return (
    <div>
      <CssBaseline>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <KuibuAppBar></KuibuAppBar>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
