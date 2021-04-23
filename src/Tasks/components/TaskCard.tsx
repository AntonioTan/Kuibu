/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 10:54:07
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-23 13:35:48
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
import React, { useEffect, useState } from 'react';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { ipcRenderer } from 'electron';
import { CreateTaskInterface } from './CreateTaskDialog';
import axios from 'axios';
import { serverAddress } from '../../utils/globals';

interface TaskCardPropsInterface {
  readonly taskID: string;
  readonly openEditTaskPanel: () => void;
}
// case class TaskCompleteInfo(taskID: String, projectID: String, taskName: String, status: Boolean, startDate: String, endDate: String, description: String, parentID: String, parentName: String, childrenMap: Map[String, TaskStatusInfo], leaderID: String, leaderName: String, userMap: Map[String, String])

export interface TaskStatusInterface {
  taskName: string;
  status: boolean;
}

export interface TaskInterface {
  taskID: string;
  taskName: string;
  projectID: string;
  status: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
  parentID: string;
  parentName: string;
  childrenMap: { [key: string]: TaskStatusInterface };
  leaderMap: { [key: string]: string };
  userMap: { [key: string]: string };
}
export interface WebReplyTaskInterface {
  taskID: string;
  taskName: string;
  projectID: string;
  status: boolean;
  startDate: string;
  endDate: string;
  description: string;
  parentID: string;
  parentName: string;
  childrenMap: { [key: string]: TaskStatusInterface };
  leaderMap: { [key: string]: string };
  userMap: { [key: string]: string };
}

export interface WebReplyGetCompleteTaskInfoMessage {
  types: string;
  taskCompleteInfo: WebReplyTaskInterface;
}

export interface UserWebCompleteTaskInfoMessage {
  type: string;
  taskID: string;
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
  const [initial, setInitial] = useState<number>(1);
  const [targetTask, setTargetTask] = useState<TaskInterface | null>();
  const [state, setState] = useState({
    drawer: false,
  });

  useEffect(() => {
    const userWebCompleteTaskInfoMessage: UserWebCompleteTaskInfoMessage = {
      type: 'UserWebCompleteTaskInfoMessage',
      taskID: props.taskID,
    };
    const getCompleteTaskInfoPromise = () => axios.post(`${serverAddress}/web`);
    axios.all([getCompleteTaskInfoPromise()]).then(
      axios.spread((getCompleteTaskInfoRst) => {
        const webReplyTaskCompleteInfo: WebReplyTaskInterface =
          getCompleteTaskInfoRst.data.taskCompleteInfo;
        const taskCompleteInfo: TaskInterface = {
          taskID: webReplyTaskCompleteInfo.taskID,
          taskName: webReplyTaskCompleteInfo.taskName,
          projectID: webReplyTaskCompleteInfo.projectID,
          status: webReplyTaskCompleteInfo.status,
          startDate: new Date(webReplyTaskCompleteInfo.startDate),
          endDate: new Date(webReplyTaskCompleteInfo.endDate),
          description: webReplyTaskCompleteInfo.description,
          parentID: webReplyTaskCompleteInfo.parentID,
          parentName: webReplyTaskCompleteInfo.parentName,
          childrenMap: webReplyTaskCompleteInfo.childrenMap,
          leaderMap: webReplyTaskCompleteInfo.leaderMap,
          userMap: webReplyTaskCompleteInfo.userMap,
        };
        setTargetTask(taskCompleteInfo);
      })
    );
    setInitial(0);
  }, [initial === 1]);
  const handleAssignerDrawer = () => {
    setState({ ...state, ['drawer']: !state['drawer'] });
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h6">{targetTask?.taskName}</Typography>
          {/* <Typography variant="subtitle1">创建于2020/02/022</Typography> */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="inherit" style={{ fontSize: '15px' }}>
                参与人:
              </Typography>
            </Grid>
            <Grid item>
              <AvatarGroup max={4}>
                {Object.entries(targetTask?.leaderMap || {}).map(
                  (leader: [string, string]) => (
                    <Avatar id={leader[0]} alt={leader[1]}>
                      {leader[1].slice(0, 1)}
                    </Avatar>
                  )
                )}
                {Object.entries(targetTask?.userMap || {}).map(
                  (member: [string, string]) => (
                    <Avatar id={member[0]} alt={member[1]}>
                      {member[1].slice(0, 1)}
                    </Avatar>
                  )
                )}
              </AvatarGroup>
            </Grid>
          </Grid>
          <Typography>{`开始日期: ${
            targetTask?.startDate.toLocaleDateString() || '无数据'
          }`}</Typography>
          <Typography>{`结束日期: ${
            targetTask?.endDate.toLocaleDateString() || '无数据'
          }`}</Typography>
          <Typography>
            {`任务描述: ${targetTask?.description || '无数据'}`}
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
