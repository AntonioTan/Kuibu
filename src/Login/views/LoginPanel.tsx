/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-04 23:04:05
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-08 09:13:50
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

const loginClick = () => {
  ipcRenderer.send('goProjects');
};
export const LoginPanel = (props: any) => {
  const classes = useStyles();
  return (
    <Flipped flipId="test" stagger>
      <Paper
        elevation={3}
        style={{
          // marginTop: '130px',
          marginRight: '100px',
          width: '400px',
          height: '270px',
        }}
      >
        <Grid item style={{ marginTop: '50px' }}>
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
                    label="密码"
                    placeholder="请输入密码"
                    size="medium"
                    type="password"
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
                size="large"
                variant="outlined"
                color="primary"
                onClick={loginClick}
              >
                登 录
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Flipped>
  );
};
