/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-04 23:04:05
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 15:37:37
 */
import {
  Button,
  Dialog,
  Fade,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import React, { ChangeEvent, useContext, useState } from 'react';
import { Flipped } from 'react-flip-toolkit';
import {
  AlertDialog,
  AlertDialogInterface,
} from '../../utils/components/AlertDialog';
import UserContextProviderComponent, {
  UserContext,
} from '../../utils/components/UserContext';
import { serverAddress } from '../../utils/globals';

interface LoginInterface {
  userID: string;
  passWord: string;
}

interface SnackBarInterface {
  snackBarTitle: string;
  snackBarContent: string;
}

interface UserWebLoginMessage {
  type: string;
  userID: string;
  passWord: string;
}

interface UserWebBasicUserInfoMessage {
  type: string;
  userID: string;
}

interface WebReplyLoginMessage {
  type: string;
  reason: string;
  outcome: boolean;
}

interface WebReplyBasicUserInfoMessage {
  type: string;
  userBasicInfo: {
    userName: string;
    sessionIDList: Array<string>;
    friendIDList: Array<string>;
    projectIDList: Array<string>;
  };
}

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#000000',
  },
}));

export const LoginPanel = (props: any) => {
  const userContext = React.useContext(UserContext);

  const [loginForm, setLoginForm] = useState<LoginInterface>({
    userID: '',
    passWord: '',
  });

  const [alertSnackBar, setAlertSnackBar] = useState<SnackBarInterface>({
    snackBarTitle: '',
    snackBarContent: '',
  });

  const [whetherOpenAlertSnackBar, setWhetherOpenAlertSnackBar] = useState<
    boolean
  >(false);

  const handleLoginFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const loginClick = () => {
    const userWebLoginMessage: UserWebLoginMessage = {
      type: 'UserWebLoginMessage',
      ...loginForm,
    };
    axios
      .post(`${serverAddress}/web`, JSON.stringify(userWebLoginMessage))
      .then((res) => {
        const webReplyLoginMessage: WebReplyLoginMessage = res.data;
        if (webReplyLoginMessage.outcome) {
          const userWebBasicUserInfoMessage: UserWebBasicUserInfoMessage = {
            type: 'UserWebBasicUserInfoMessage',
            userID: loginForm.userID,
          };
          Promise.resolve(
            axios
              .post(
                `${serverAddress}/web`,
                JSON.stringify(userWebBasicUserInfoMessage)
              )
              .then((res) => {
                const webReplyBasicUserInfoMessage: WebReplyBasicUserInfoMessage =
                  res.data;
                console.log(res.data);
                userContext.updateStringField(
                  'userName',
                  webReplyBasicUserInfoMessage.userBasicInfo.userName
                );
                userContext.updateListField(
                  'sessionIDList',
                  webReplyBasicUserInfoMessage.userBasicInfo.sessionIDList
                );
                userContext.updateListField(
                  'friendIDList',
                  webReplyBasicUserInfoMessage.userBasicInfo.friendIDList
                );
                userContext.updateListField(
                  'projectIDList',
                  webReplyBasicUserInfoMessage.userBasicInfo.projectIDList
                );
              })
          ).then(() => ipcRenderer.send('goProjects'));
        } else {
          setAlertSnackBar({
            snackBarTitle: '登录结果',
            snackBarContent: '用户ID或密码名错误，请重新登录！',
          });
          setWhetherOpenAlertSnackBar(true);
        }
      });
  };

  const handleAlertSnackBarClose = () => {
    setWhetherOpenAlertSnackBar(false);
  };

  const handleEnterInput = (e: any) => {
    if (e.key == 'Enter') {
      loginClick();
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        open={whetherOpenAlertSnackBar}
        autoHideDuration={6000}
        onClose={handleAlertSnackBarClose}
        style={{
          marginBottom: '550px',
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <Alert
          variant="outlined"
          onClose={handleAlertSnackBarClose}
          severity="error"
        >
          {`${alertSnackBar.snackBarTitle}: ${alertSnackBar.snackBarContent}`}
        </Alert>
      </Snackbar>
      <Flipped flipId="test" stagger>
        <Paper
          elevation={3}
          style={{
            // marginTop: '130px',
            // marginRight: '100px',
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
                      id="userID"
                      fullWidth={true}
                      label="用户ID"
                      placeholder="请输入用户ID"
                      size="medium"
                      style={{
                        width: '250px',
                        backgroundColor: 'white',
                      }}
                      value={loginForm.userID}
                      onChange={handleLoginFormChange}
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
                      id="passWord"
                      fullWidth={true}
                      label="密码"
                      placeholder="请输入密码"
                      size="medium"
                      type="password"
                      style={{
                        width: '250px',
                      }}
                      value={loginForm.passWord}
                      onChange={handleLoginFormChange}
                      onKeyPress={handleEnterInput}
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
    </div>
  );
};
