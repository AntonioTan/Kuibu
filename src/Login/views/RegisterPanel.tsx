/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 18:41:39
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-07 20:54:29
 */

import {
  Button,
  Fade,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { ipcRenderer } from 'electron';
import React from 'react';
import { Flipped } from 'react-flip-toolkit';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#000000',
  },
}));
const registerClick = () => {};
export const RegisterPanel = (props: any) => {
  const classes = useStyles();
  return (
    <Flipped flipId="test">
      <Paper
        elevation={3}
        style={{
          marginRight: '100px',
          width: '400px',
          height: '370px',
        }}
      >
        <Grid item style={{ marginTop: '60px' }}>
          <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item></Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    fullWidth={true}
                    label="用户名"
                    placeholder="请输入用户名"
                    size="medium"
                    style={{
                      width: '250px',
                      backgroundColor: 'white',
                    }}
                    inputProps={{
                      className: classes.input,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    fullWidth={true}
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    size="medium"
                    style={{
                      width: '250px',
                    }}
                    inputProps={{
                      classes: {
                        input: {
                          fontsize: 50,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    fullWidth={true}
                    type="password"
                    label="重复密码"
                    placeholder="请再次输入密码"
                    size="medium"
                    style={{
                      width: '250px',
                    }}
                    inputProps={{
                      classes: {
                        input: {
                          fontsize: 50,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Button
                type="submit"
                size="large"
                variant="outlined"
                color="primary"
                onClick={registerClick}
              >
                注 册
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Flipped>
  );
};
