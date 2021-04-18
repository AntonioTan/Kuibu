/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 10:54:07
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-16 22:20:28
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
import { TaskInterface } from './CreateTaskDialog';

interface TaskCardPropsInterface {
  readonly targetTask: TaskInterface;
  readonly openEditTaskPanel: () => void;
}

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
export const TaskCard = (props: TaskCardPropsInterface) => {
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
          <Typography variant="h6">{props.targetTask.taskName}</Typography>
          {/* <Typography variant="subtitle1">创建于2020/02/022</Typography> */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="inherit" style={{ fontSize: '15px' }}>
                参与人:
              </Typography>
            </Grid>
            <Grid item>
              <AvatarGroup max={4}>
                {Object.entries(props.targetTask.leaders)
                  .filter((leader: [string, boolean]) => leader[1])
                  .map((leader: [string, boolean]) => (
                    <Avatar alt={leader[0]}>{leader[0].slice(0, 1)}</Avatar>
                  ))}

                {Object.entries(props.targetTask.members)
                  .filter((member: [string, boolean]) => member[1])
                  .map((member: [string, boolean]) => (
                    <Avatar alt={member[0]}>{member[0].slice(0, 1)}</Avatar>
                  ))}
              </AvatarGroup>
            </Grid>
          </Grid>
          <Typography>{`开始日期: ${props.targetTask.startDate?.toLocaleDateString()}`}</Typography>
          <Typography>{`结束日期: ${props.targetTask.endDate?.toLocaleDateString()}`}</Typography>
          <Typography>
            {`任务描述: ${props.targetTask.description}`}{' '}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.openEditTaskPanel}
          >
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
