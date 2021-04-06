/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-01 18:59:31
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 00:02:17
 */
import {
  AppBar,
  CssBaseline,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  Paper,
  Button,
  ThemeProvider,
  createMuiTheme,
  Fade,
} from '@material-ui/core';
import React from 'react';
import bgImg from '../../assets/imgs/willian-justen-de-vasconcellos-jUCQRQeRs3k-unsplash.jpg';
import { LoginPanel } from './views/LoginPanel';
import { RegisterPanel } from './views/RegisterPanel';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { KuibuTitle } from '../utils/components/KuibuTitle';

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
    background: 'primary',
    height: '70px',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f7385',
    },
    secondary: {
      main: '#d7ebed',
    },
    textPrimary: {
      main: '#d7ebed',
    },
  },
});

export const LoginPage = () => {
  const [whetherRegister, setWhetherRegister] = React.useState(false);
  const classes = useStyles();
  const handleRegisterClick = () => {
    var register = whetherRegister;
    console.log(whetherRegister);
    setWhetherRegister(!register);
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline>
          <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
            style={{
              // background: 'linear-gradient(0deg, #FFFFFF, #82ffa1)',
              backgroundImage: `url(${bgImg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              height: '760px',
              position: 'fixed',
              // marginTop: '70px',
            }}
          >
            <Grid item>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar style={{ paddingTop: 10 }}>
                  <KuibuTitle></KuibuTitle>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                spacing={2}
                justify="center"
                alignItems="center"
              >
                <Flipper flipKey={whetherRegister} spring="veryGentle">
                  {!whetherRegister ? (
                    <LoginPanel register={whetherRegister}></LoginPanel>
                  ) : (
                    <RegisterPanel register={whetherRegister}></RegisterPanel>
                  )}
                </Flipper>
                <Grid item></Grid>
                <Flipper flipKey={whetherRegister} spring="veryGentle">
                  <Flipped flipId="tt">
                    <Grid item style={{ marginRight: '100px' }}>
                      <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={handleRegisterClick}
                      >
                        {whetherRegister ? '已有账户 立即登录' : '注册账户'}
                      </Button>
                    </Grid>
                  </Flipped>
                </Flipper>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Grid>
        </CssBaseline>
      </div>
    </ThemeProvider>
  );
};
