/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-01 18:59:31
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-02 01:14:53
 */
import {
  AppBar,
  CssBaseline,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { AccountCircle, Gradient, Lock } from '@material-ui/icons';
import bgImg from '../../../assets/imgs/willian-justen-de-vasconcellos-jUCQRQeRs3k-unsplash.jpg';
import { NONAME } from 'dns';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#0086b3',
  },
  input: {
    color: '#00bfff',
  },
}));
export const LoginView = () => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline>
        <Paper
          elevation={8}
          style={{
            // background: 'linear-gradient(0deg, #FFFFFF, #82ffa1)',
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            width: '1024px',
            height: '728px',
            marginTop: '40px',
          }}
        >
          <Grid
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{ paddingTop: 10 }}>
                  <Typography
                    align="center"
                    variant="h6"
                    style={{
                      userSelect: 'none',
                      width: 900,
                    }}
                    noWrap
                  >
                    跬步
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Paper
              elevation={3}
              style={{
                marginTop: '150px',
                marginRight: '100px',
                width: '400px',
                height: '300px',
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
                      {/* </Paper> */}
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
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </CssBaseline>
    </div>
  );
};
