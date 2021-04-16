/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-15 09:46:13
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-15 10:34:31
 */

import React from 'react';
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Paper,
  InputBase,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import SendIcon from '@material-ui/icons/Send';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChatIcon from '@material-ui/icons/Chat';
import { fakeMembers } from '../utils/mock';

export const MemberPanel = () => {
  return (
    <div>
      <Grid container direction="column" style={{ width: '600px' }}>
        <Grid item>
          <Typography variant="h6">小组成员</Typography>
        </Grid>
        <Grid item>
          <List dense={false}>
            {fakeMembers.map((fakeName) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>T</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={fakeName}
                    secondary="I love working!"
                  ></ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <AccountBoxIcon
                        fontSize="inherit"
                        color="inherit"
                        style={{
                          fontSize: '30px',
                          color: '#48708b',
                        }}
                      ></AccountBoxIcon>
                    </IconButton>
                    <IconButton edge="end">
                      <ChatIcon
                        fontSize="inherit"
                        color="primary"
                        style={{ fontSize: '30px' }}
                      ></ChatIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
