/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 10:54:07
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-16 09:24:51
 */

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React, { useState } from 'react';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatarSmall: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '20px',
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    card: {
      width: '400px',
      height: '300px',
    },
  })
);
export const TaskCard = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    drawer: false,
  });
  const handleAssignerDrawer = () => {
    setState({ ...state, ['drawer']: !state['drawer'] });
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h6">任务一</Typography>
          <Typography variant="subtitle1">创建于2020/02/022</Typography>
          <AvatarGroup max={4}>
            <Avatar
              style={{ backgroundColor: 'orange' }}
              className={classes.avatarSmall}
            >
              T
            </Avatar>
            <Avatar
              style={{ backgroundColor: 'green' }}
              className={classes.avatarSmall}
            >
              H
            </Avatar>
            <Avatar
              style={{ backgroundColor: 'blue' }}
              className={classes.avatarSmall}
            >
              E
            </Avatar>
          </AvatarGroup>
          <Typography>开始日期: 2020/02/22</Typography>
          <Typography> 结束日期: 2020/02/23</Typography>
          <Typography>任务描述: 主要负责任务管理信息系统的开发工作</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="primary">
            查看详情
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            style={{ color: '#9c2712' }}
          >
            删除
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
