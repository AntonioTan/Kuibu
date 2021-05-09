/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 21:21:29
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 17:24:39
 */
import React, { useCallback, useState } from 'react'
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
  Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SelectTargetInterface } from '../DataInterface/SelectTargetInterface';
import { MyEditTaskInterface } from '../DataInterface/MyEditTaskInterface';
import { UserWebGetMyTaskListMessage } from '../Messages/UserWebGetMyTaskListMessage';
import { serverAddress } from '../../utils/globals';
import axios from 'axios';
import { WebReplyGetMyTaskListMessage } from '../Messages/WebReplyGetTaskListMessage';
import { MyTaskInterface } from '../DataInterface/MyTaskInterface';

interface TaskListPanelInterface {
  handleSetEditTaskID: (val: string)=>void
}


export const TaskListPanel = (props: TaskListPanelInterface) => {
  const [initial, setInitial] = useState<number>(1);
  const [selected, setSelected] = useState(null);
  const [selectedTask, setSelectedTask] = useState<MyEditTaskInterface>()
  const [myTaskList, setMyTaskList] = useState<Array<MyTaskInterface>>([])

  React.useEffect(()=>{
    const projectID = window.localStorage.getItem("currentProjectID")||"";
    const userID = window.localStorage.getItem("userID")||""
    if(projectID!=""&&userID!="") {
    const userWebGetMyTaskListMessage: UserWebGetMyTaskListMessage = {
      type: "UserWebGetMyTaskListMessage",
      projectID: projectID,
      userID: userID,
    }
    const getMyTaskListPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetMyTaskListMessage)
      )

    axios.all([getMyTaskListPromise()]).then(
      axios.spread(
        (getMyTaskListRst) => {
          const webReplyGetMyTaskListMessage: WebReplyGetMyTaskListMessage =  getMyTaskListRst.data as WebReplyGetMyTaskListMessage
          setMyTaskList(webReplyGetMyTaskListMessage.myTaskList)
        })
    )
    setInitial(0);

    }
  }, [initial])

  const onSelectionChange = (selectTarget: any) => {
    selectTarget = selectTarget as SelectTargetInterface
    setSelected(selectTarget.selected)
    setSelectedTask(selectTarget.data)

  }
  const gridStyle = { minHeight: 550, minWidth: 800 }

  const columns =  [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 60, type: 'number' },
    { name: 'taskID', header: '任务ID', defaultFlex: 1},
    { name: 'taskName', header: '任务名称', defaultFlex: 1 },
    { name: 'description', header: '任务描述', defaultFlex: 1 },
    { name: 'startDate', header: '开始于', defaultWidth: 1000, defaultFlex: 1 },
    { name: 'endDate', header: '预期结束于', defaultFlex: 1 },
    { name: 'leader', header: '领导人', defaultFlex: 1 },
    { name: 'members', header: '成员', maxWidth: 1600, defaultFlex: 3 },
  ];

  const fakeData = [
    {
      taskName: '111',
      taskID: '111111',
      startDate: '2021/03/23',
      endDate: '2021/03/23',
      leader: "Tianyi",
      members: "Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey",
      members2: "Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey",
    },
    {
      taskName: '111',
      taskID: '111111',
      startDate: '2021/03/23',
      endDate: '2021/03/23',
      leader: "Tianyi",
      members: "Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey",
      members2: "Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey,Phoebie, Chandler, Monica, Joey"
    }
  ]

  const handleEditTaskClick = () => {
    if(selectedTask?.taskID) props.handleSetEditTaskID(selectedTask!.taskID)
  }

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h6">我的任务</Typography>
            </Grid>
            <Grid item>
              <Button startIcon={<EditIcon/>} variant="outlined" color="primary" onClick={handleEditTaskClick}>
                编辑选取任务
              </Button>
            </Grid>
          </Grid>

        </Grid>
        <Grid item>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        columns={columns}
        dataSource={myTaskList}
        rowDetailsWidth="max-viewport-width"
        enableSelection={true}
        onSelectionChange={onSelectionChange}
        toggleRowSelectOnClick={true}
        scrollProps={{alwaysShowTract: true, autoHide: false}}
        nativeScroll={false}
      />
        </Grid>

      </Grid>

    </div>
  );
}
