/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-22 16:15:59
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-05 16:53:46
 */
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface IProps {
  name?: string;
  open: boolean;
  theme: Theme;
}

interface IState {
  // theme: Theme;
  chatOpen: boolean;
}

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      marginLeft: -drawerWidth,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      marginLeft: drawerWidth,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: '#FF0F20',
    },
    drawerClose: {
      marginLeft: -drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  })
);

export default function ContactDrawer(props: any) {
  const classes = useStyles(props.theme);

  axios.get('http://127.0.0.1:8080/events').then((e) => console.log(e));
  // const ws2 = new WebSocket('ws:127.0.0.1:8080/events');
  // ws2.onmessage = (e) => {
  //   console.log(e);

  const ws = new WebSocket(
    'ws:127.0.0.1:8080/chat/msg?senderID=001&receiverID=002'
  );
  const ws2 = new WebSocket(
    'ws:127.0.0.1:8080/chat/msg?senderID=001&receiverID=002'
  ); // };
  ws.onopen = (e) => {
    console.log('connected');
    // const res = ws.send('hello');
    // console.log(res);
  };
  ws2.onopen = (e) => {
    // console.log('connected');
    // const res = ws2.send('hello2');
    // console.log(res);
    var a = {
      type: 'WebLoginMessage',
      loginType: 'hh',
      infoList: ['jj'],
      sender: '000010',
    };
    console.log(
      JSON.stringify(a) ==
        '{"type":"WebLoginMessage","loginType":"hh","infoList":["jj"],"sender":"000010"}'
    );
    ws2.send(JSON.stringify(a));
  };
  ws2.onmessage = (e) => {
    console.log(e);
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem
            button
            key={text}
            style={{ height: 200 }}
            onClick={props.handleTest}
          >
            <ListItemText primary={text} style={{ color: '#FFFFFF' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
