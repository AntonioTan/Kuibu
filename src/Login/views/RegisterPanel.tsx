/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 18:41:39
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 00:37:53
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
import axios from 'axios';
import { ipcRenderer } from 'electron';
import React, { ChangeEvent, useState } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { serverAddress } from '../../utils/globals';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#000000',
  },
}));

interface registerInterface {
  type: string;
  userName: string;
  passWord: string;
  rePassWord: string;
}
export const RegisterPanel = (props: any) => {
  const [registerState, setRegisterState] = useState<registerInterface>({
    type: 'UserWebRegisterMessage',
    userName: '',
    passWord: '',
    rePassWord: '',
  });

  const registerClick = () => {
    const registerEntity = JSON.stringify(registerState);
    console.log(registerEntity);
    axios.post(serverAddress + '/web', registerEntity).then((res) => {
      console.log(res);
    });
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterState({
      ...registerState,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const classes = useStyles();
  return (
    <Flipped flipId="test">
      <Paper
        elevation={3}
        style={{
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
                    id="userName"
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
                    onChange={handleRegisterChange}
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
                    id="passWord"
                    fullWidth={true}
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    size="medium"
                    style={{
                      width: '250px',
                    }}
                    onChange={handleRegisterChange}
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
                    id="rePassWord"
                    fullWidth={true}
                    type="password"
                    label="重复密码"
                    placeholder="请再次输入密码"
                    size="medium"
                    style={{
                      width: '250px',
                    }}
                    onChange={handleRegisterChange}
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
