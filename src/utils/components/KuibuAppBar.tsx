/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 23:38:05
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 00:08:11
 */

import {
  AppBar,
  createStyles,
  CssBaseline,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  useTheme,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { KuibuTitle } from './KuibuTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: 'primary',
    },
  })
);

export const KuibuAppBar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const theme = useTheme();
  const openProfile = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ paddingTop: 10 }}>
          <KuibuTitle></KuibuTitle>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                style={{ marginTop: theme.spacing(5) }}
                open={openProfile}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
