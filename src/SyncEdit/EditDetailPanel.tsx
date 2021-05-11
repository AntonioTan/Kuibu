/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 20:06:49
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 13:22:38
 */

import { IconButton, Avatar, Button, Checkbox, createStyles, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, List,  ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, TextField, Theme, Typography, Snackbar } from '@material-ui/core';
import { Alert, AvatarGroup } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import React, { ChangeEvent, useState } from 'react'
import { AddToDoDialog } from './Components/AddToDoDialog';
import { SyncTaskInfoInterface } from './DataInterface/SyncTaskInterface';
import { UserWebGetSyncTaskInfoMessage } from './Messages/UserWebGetSyncTaskInfoMessage';
import axios from 'axios';
import { serverAddress, wsAddress } from '../utils/globals';
import { WebReplyGetSyncTaskInfoMessage } from './Messages/WebReplyGetSyncTaskInfoMessage';
import { UserWsSyncEditMessage } from './Messages/UserWsSyncEditMessage';
import { TaskProcessInfoInterface } from './DataInterface/TaskProcessInfoInterface';
import { UserWebToDoJudgeMessage } from './Messages/UseWebToDoJudgeMessage';
import { WebReplyToDoJudgeMessage } from './Messages/WebReplyToDoJudgeMessage';
import { UserWsUpdateToDoJudgeMessage } from './Messages/UserWsUpdateToDoJudgeMessage';
import { TaskToDoInfoInterface } from './DataInterface/TaskToDoInfoInterface';
import { UserWebToDoStatusChangeMessage } from './Messages/UserWebToDoStatusChangeMessage';
import { WebReplyToDoStatusChangeMessage } from './Messages/WebReplyToDoStatusChangeMessae';
import { UserWsToDoStatusChangeMessage } from './Messages/UserWsToDoStatusChangeMessage';
import { UserWebProcessInfoUpdateMessage } from './Messages/UserWebTaskProcessInfoSubmitMessage';
import { WebReplyTaskProcessInfoUpdateMessage } from './Messages/WebReplyTaskProcessInfoUpdateMessage';
import { UserWsTaskProcessInfoUpdateMessage } from './Messages/UserWsTaskProcessInfoUpdateMessage';
import { SnackBarInterface } from '../Login/views/LoginPanel';
import { UserWebAddToDoMessage } from './Messages/UserWebAddToDoMessage';
import { WebReplyAddToDoMessage } from './Messages/WebReplyAddToDoMessage';
import { UserWsAddToDoMessage } from './Messages/UserWsAddToDoMessage';
import { attachTypeApi } from 'antd/lib/message';


interface EditDetailPanelInterface {
  taskID: string;
  whetherEditTask: boolean;
  handleWhetherEditTask: (val: boolean) => void;
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
      fontSize: '17px',
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export function EditDetailPanel(props: EditDetailPanelInterface) {

  const classes = useStyles()
  const userID: string = window.localStorage.getItem("userID")||""
  const ws = React.useRef(new WebSocket(`${wsAddress}/ws?userID=${window.localStorage.getItem("userID")}`))
  // ws.current = new WebSocket(`${wsAddress}/ws?userID=${window.localStorage.getItem("userID")}`)
  React.useEffect(() => {
    return () => ws.current.close();
}, []);
  const [whetherOpenAlertSnackBar, setWhetherOpenAlertSnackBar] = React.useState<boolean>(false)
  const [alertSnackBar, setAlertSnackBar] = useState<SnackBarInterface>({
    snackBarTitle: '',
    snackBarContent: '',
  });
  const handleAlertSnackBarClose = () => {
    setWhetherOpenAlertSnackBar(false);
  };

  const [myEditProcessInfoID, setMyEditProcessInfoID] = React.useState<string>("")
  const [initial, setInitial] = React.useState<number>(1);
  const [editingUserIDList, setEditingUserIDList] = React.useState<Array<string>>([]);
  const [lastEditContent, setLastEditContent] = React.useState<string>("");
  const [myEditContent, setMyEditContent] = React.useState<string>("");
  const [syncTaskInfo, setSyncTaskInfo] = React.useState<SyncTaskInfoInterface>(
    {
      taskID: "",
      taskName: "正在获取",
      leaderName: "正在获取",
      leaderIDList: [],
      description: "正在获取",
      startDate: "正在获取",
      endDate: "正在获取",
      toDoList: [],
      processInfoMap: {},
      allMemberMap: {},
  }
  )

  const [whetherAddToDo, setWhetherAddToDo] = useState<boolean>(false);

  const handleMyEditChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newEditContent: string = event.currentTarget.value
    setMyEditContent(newEditContent)
    console.log(newEditContent.length)
    if(Math.abs(newEditContent.length-lastEditContent.length)>5) {
      if(ws.current.OPEN||false) {
        if(syncTaskInfo.taskID != "" && userID != "") {
        const userWsSyncEditMessage: UserWsSyncEditMessage = {
          type: "UserWsSyncEditMessage",
          taskID: syncTaskInfo.taskID,
          editUserID: userID,
          content: newEditContent
        }
        ws.current.send(JSON.stringify(userWsSyncEditMessage))

        }
      }
    }
  }

  // React.useLayoutEffect(() => {
  ws.current.onmessage = (res) => {
    // setInitial(1)
    const data = JSON.parse(res.data)
    console.log(data)
    if(data.type == "UserWsSyncEditMessage") {
      const userWsSyncEditMessage: UserWsSyncEditMessage = data as UserWsSyncEditMessage
      console.log(Object.keys(syncTaskInfo.processInfoMap).indexOf(userWsSyncEditMessage.editUserID))
      if(editingUserIDList.indexOf(userWsSyncEditMessage.editUserID)==-1) {
        setEditingUserIDList([
        ...editingUserIDList, userWsSyncEditMessage.editUserID
      ])}
        console.log("check", {
          ...syncTaskInfo,
          ['processInfoMap']:{
            ...syncTaskInfo.processInfoMap,
            [userWsSyncEditMessage.editUserID]: {
              taskProcessInfoID: "",
              editUserID: userWsSyncEditMessage.editUserID,
              content: userWsSyncEditMessage.content,
              editDate: Date.now().toLocaleString(),
            }
          }
        })
      if(Object.keys(syncTaskInfo.processInfoMap).indexOf(userWsSyncEditMessage.editUserID)!=-1) {
      setSyncTaskInfo({
        ...syncTaskInfo,
        ['processInfoMap']:{
          ...syncTaskInfo.processInfoMap,
          [userWsSyncEditMessage.editUserID]: {
            ...syncTaskInfo.processInfoMap[userWsSyncEditMessage.editUserID],
            ["content"]: userWsSyncEditMessage.content
          }
        }
      })
      } else {
        console.log("outer", {
          ...syncTaskInfo,
          ['processInfoMap']:{
            ...syncTaskInfo.processInfoMap,
            [userWsSyncEditMessage.editUserID]: {
              taskProcessInfoID: "",
              editUserID: userWsSyncEditMessage.editUserID,
              content: userWsSyncEditMessage.content,
              editDate: Date.now().toLocaleString(),
            }
          }
        })
       setSyncTaskInfo({
        ...syncTaskInfo,
        ['processInfoMap']:{
          ...syncTaskInfo.processInfoMap,
          [userWsSyncEditMessage.editUserID]: {
            taskProcessInfoID: "",
            editUserID: userWsSyncEditMessage.editUserID,
            content: userWsSyncEditMessage.content,
            editDate: Date.now().toLocaleString(),
          }
        }
      })
      }
    } else if(data.type == "UserWsUpdateToDoJudgeMessage") {
      const userWsUpdateToDoJudgeMessage: UserWsUpdateToDoJudgeMessage = data as UserWsUpdateToDoJudgeMessage
      var toDoList: Array<TaskToDoInfoInterface> = Object.assign(syncTaskInfo.toDoList, [])
      toDoList.filter(toDo => toDo.taskToDoID === userWsUpdateToDoJudgeMessage.taskToDoID).map(toDo => {
        if(!userWsUpdateToDoJudgeMessage.outcome){
          toDo.finishUserID=""
        }
        toDo.status = userWsUpdateToDoJudgeMessage.outcome?"2":"0"
      })
      setSyncTaskInfo({
        ...syncTaskInfo,
        ['toDoList']: toDoList,
      })
    } else if(data.type == "UserWsToDoStatusChangeMessage") {
      const userWsToDoStatusChangeMessage: UserWsToDoStatusChangeMessage = data as UserWsToDoStatusChangeMessage
      var toDoList: Array<TaskToDoInfoInterface> = Object.assign(syncTaskInfo.toDoList, [])
      toDoList.filter(toDo => toDo.taskToDoID===userWsToDoStatusChangeMessage.taskToDoID).map(
        toDo => {
          toDo.finishUserID = userWsToDoStatusChangeMessage.finishUserID
          toDo.status = userWsToDoStatusChangeMessage.status
          toDo.endDate = userWsToDoStatusChangeMessage.endDate
        }
      )
      setSyncTaskInfo({
        ...syncTaskInfo,
        ['toDoList']: toDoList,
      })

    } else if(data.type == "UserWsTaskProcessInfoUpdateMessage") {
      const userWsTaskProcessInfoUpdateMessage: UserWsTaskProcessInfoUpdateMessage = data as UserWsTaskProcessInfoUpdateMessage
      const editUserID = userWsTaskProcessInfoUpdateMessage.newTaskProcessInfo.editUserID
      if(editUserID != userID) {
        var newEditingUserIDList: Array<string> = Object.assign(editingUserIDList, [])
        if(newEditingUserIDList.indexOf(editUserID)!=-1) {
          newEditingUserIDList = newEditingUserIDList.filter(userID => userID!=editUserID)
          setEditingUserIDList(newEditingUserIDList)
        }
      }
      setSyncTaskInfo({
        ...syncTaskInfo,
        ['processInfoMap']: {
          ...syncTaskInfo['processInfoMap'],
          [editUserID]: userWsTaskProcessInfoUpdateMessage.newTaskProcessInfo
        }
      })
    } else if(data.type == "UserWsAddToDoMessage") {
      const userWsAddToDoMessage: UserWsAddToDoMessage = data as UserWsAddToDoMessage
      setSyncTaskInfo({
        ...syncTaskInfo,
        ['toDoList']: [
          ...syncTaskInfo.toDoList,
          userWsAddToDoMessage.newToDo
        ]
      })
    }

  }
// }, [ws]);

  React.useEffect(()=>{
    if(props.taskID != "") {
      const userWebGetSyncTaskInfoMessage: UserWebGetSyncTaskInfoMessage = {
        type: "UserWebGetSyncTaskInfoMessage",
        taskID: props.taskID
      }
      const getSyncTaskInfoPromise = () =>
      axios.post(
        `${serverAddress}/web`, JSON.stringify(userWebGetSyncTaskInfoMessage)
      )
      axios.all([getSyncTaskInfoPromise()]).then(
        axios.spread(
          (getSyncTaskInfoRst) => {
            const webReplyGetSyncTaskInfoMessage: WebReplyGetSyncTaskInfoMessage = getSyncTaskInfoRst.data as WebReplyGetSyncTaskInfoMessage
            setSyncTaskInfo(webReplyGetSyncTaskInfoMessage.syncTaskInfo)
            console.log(webReplyGetSyncTaskInfoMessage.syncTaskInfo)
            setMyEditProcessInfoID(webReplyGetSyncTaskInfoMessage.syncTaskInfo.processInfoMap[userID].taskProcessInfoID)
            const myEditProcessInfo =  webReplyGetSyncTaskInfoMessage.syncTaskInfo.processInfoMap[userID]
            setLastEditContent(myEditProcessInfo.content)
            setMyEditContent(myEditProcessInfo.content)
          }
        )
      )
    setInitial(0)
    }
  }, [initial, props.whetherEditTask])
  const handleWhetherAddToDo = (val: boolean) => {
    setWhetherAddToDo(val)
  }

  const handleAddToDoClick = () => {
    setWhetherAddToDo(true)
  }

  const handleToDoCheckChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const taskToDoID = event.currentTarget.id
    const status = syncTaskInfo.leaderIDList.indexOf(userID)!=-1?"2":"1"
    const userWebToDoStatusChangeMessage: UserWebToDoStatusChangeMessage = {
      type: "UserWebToDoStatusChangeMessage",
      taskToDoID: taskToDoID,
      status: status,
      finishUserID: userID,
    }
    axios.post(`${serverAddress}/web`, JSON.stringify(userWebToDoStatusChangeMessage)).then(
      (res) => {
        const webReplyToDoStatusChangeMessage: WebReplyToDoStatusChangeMessage = res.data as WebReplyToDoStatusChangeMessage
        if(webReplyToDoStatusChangeMessage.outcome && ws.current.OPEN==1) {
          const userWsToDoStatusChangeMessage: UserWsToDoStatusChangeMessage = {
            type: "UserWsToDoStatusChangeMessage",
            taskID: syncTaskInfo.taskID,
            taskToDoID: taskToDoID,
            status: status,
            finishUserID: userID,
            endDate: webReplyToDoStatusChangeMessage.endDate
          }
          ws.current.send(JSON.stringify(userWsToDoStatusChangeMessage))
        }
      }
    )

  }

  const handleClosePanel = () => {
    props.handleWhetherEditTask(false);
  }

  const handleToDoJudgeClick = (taskToDoID: string, outcome: boolean) => {
    const userWebToDoJudgeMessage: UserWebToDoJudgeMessage = {
      type: "UserWebToDoJudgeMessage",
      taskToDoID: taskToDoID,
      outcome: outcome
    }
    axios.post(`${serverAddress}/web`, JSON.stringify(userWebToDoJudgeMessage)).then(
      (res) => {
        const webReplyToDoJudgeMessage: WebReplyToDoJudgeMessage = res.data as WebReplyToDoJudgeMessage
        if(webReplyToDoJudgeMessage.outcome && ws.current.OPEN==1) {
          const userWsUpdateToDoJudgeMessage: UserWsUpdateToDoJudgeMessage = {
            type: "UserWsUpdateToDoJudgeMessage",
            taskID: syncTaskInfo.taskID,
            taskToDoID: taskToDoID,
            outcome: outcome,
          }
          ws.current.send(JSON.stringify(userWsUpdateToDoJudgeMessage))
        }
      }
    )

  }

  const handleToDoJudgePassClick = (e: React.MouseEvent<HTMLElement>) => {
    handleToDoJudgeClick(e.currentTarget.id, true)
  }

  const handleToDoJudgeDisproveClick = (e: React.MouseEvent<HTMLElement>) => {
    handleToDoJudgeClick(e.currentTarget.id, false)
  }

  const handleEditSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
    const userWebTaskProcessInfoUpdateMessage: UserWebProcessInfoUpdateMessage = {
      type: "UserWebProcessInfoUpdateMessage",
      taskID: syncTaskInfo.taskID,
      editUserID: userID,
      content: myEditContent
    }
    axios.post(`${serverAddress}/web`, JSON.stringify(userWebTaskProcessInfoUpdateMessage)).then(
      (res) => {
        const webReplyTaskProcessInfoUpdateMessage:WebReplyTaskProcessInfoUpdateMessage = res.data as WebReplyTaskProcessInfoUpdateMessage
        if(webReplyTaskProcessInfoUpdateMessage.outcome) {
          setAlertSnackBar({
            snackBarTitle: "提交结果",
            snackBarContent: "提交成功！"
          })
          setWhetherOpenAlertSnackBar(true)
          const userWsTaskProcessInfoUpdateMessage: UserWsTaskProcessInfoUpdateMessage = {
            type: "UserWsTaskProcessInfoUpdateMessage",
            taskID: syncTaskInfo.taskID,
            newTaskProcessInfo: webReplyTaskProcessInfoUpdateMessage.newTaskProcessInfo
          }
          ws.current.send(JSON.stringify(userWsTaskProcessInfoUpdateMessage))
        }
      }
    )
  }

  const handleAddNewToDo = (newToDo: TaskToDoInfoInterface) => {
    const userWebAddToDoMessage: UserWebAddToDoMessage = {
      type: "UserWebAddToDoMessage",
      taskID: syncTaskInfo.taskID,
      newToDo: newToDo,
    }
    axios.post(`${serverAddress}/web`, JSON.stringify(userWebAddToDoMessage)).then(
      (res) => {
        setWhetherOpenAlertSnackBar(true);
        setAlertSnackBar({
          snackBarTitle: "添加结果",
          snackBarContent: "添加成功"
        })

        const webReplyAddToDoMessage: WebReplyAddToDoMessage = res.data as WebReplyAddToDoMessage
        if(webReplyAddToDoMessage.outcome) {
          const userWsAddToDoMessage: UserWsAddToDoMessage = {
            type: "UserWsAddToDoMessage",
            taskID: syncTaskInfo.taskID,
            newToDo: webReplyAddToDoMessage.newToDo
          }
          ws.current.send(JSON.stringify(userWsAddToDoMessage))
        }
      }
    )
  }




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
          severity="info"
        >
          {`${alertSnackBar.snackBarTitle}: ${alertSnackBar.snackBarContent}`}
        </Alert>
      </Snackbar>
      <Paper style={{padding:20, overflow: 'auto', width: 800, height: 600}}>
      <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container direction="row" alignItems="center" justify="space-between">
          <Grid item>
          <Typography variant="h6">{syncTaskInfo.taskName}</Typography>
          </Grid>
          <Grid item>
          <IconButton style={{right: 0}} onClick={handleClosePanel}><CloseIcon></CloseIcon></IconButton>
          </Grid>
        </Grid>
       </Grid>
       <Divider></Divider>

        <Grid item>
          <Typography>Leader: {syncTaskInfo.leaderName}</Typography>
        </Grid>
        <Grid item>
          <Typography component="span">任务描述: {syncTaskInfo.description}</Typography>
        </Grid>
        <Grid item>
          <Typography>开始于: {syncTaskInfo.startDate}</Typography>
        </Grid>
        <Grid item>
          <Typography>预计结束于: {syncTaskInfo.endDate}</Typography>
        </Grid>
        <Divider></Divider>
        <Grid item>
        <FormControl component="fieldset">
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
        <FormLabel component="legend">待完成</FormLabel>
            </Grid>
            <Grid item>
        <IconButton color="primary" onClick={handleAddToDoClick}><AddIcon></AddIcon></IconButton>
            </Grid>
          </Grid>
        <FormGroup>
          {syncTaskInfo.toDoList.filter(todo => todo.status=="0").map(todo => {
            return (
          <FormControlLabel
            control={<Checkbox id={todo.taskToDoID} color="primary" onChange={handleToDoCheckChange} name={todo.taskToDoID} />}
            label={todo.content}
          />
            )
          })}
        </FormGroup>
        <FormHelperText>
          正在编辑:
          <AvatarGroup max={3}>
            <Avatar alt="Phoebie" className={classes.avatarSmall}>P</Avatar>
            </AvatarGroup>
        </FormHelperText>
      </FormControl>
        </Grid>
        <Divider></Divider>
        <Grid item>
          <Typography variant="subtitle1">待审核</Typography>
          <List>
              {syncTaskInfo.toDoList.filter(todo => todo.status=="1").map(todo=>{
                return (
                  <ListItem>
          <ListItemText
          primary={todo.content}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                由{syncTaskInfo.allMemberMap[todo.createUserID]}创建
              </Typography>
              {/* {`完成于${todo.endDate}`} //description */}
            </React.Fragment>
          }
        />

        {syncTaskInfo.leaderIDList.indexOf(userID)!=-1?
        (
        <ListItemSecondaryAction>
          <Button variant='outlined' color="primary" id={todo.taskToDoID} onClick={handleToDoJudgePassClick}>通过</Button>
          <Button
            color="inherit"
            variant="outlined"
            style={{ color: '#9c2712', left: 5 }}
            onClick={handleToDoJudgeDisproveClick}
          >
            不通过
          </Button>
        </ListItemSecondaryAction>
        ):
        (
          <div></div>
        )}
            </ListItem>
                )
              })}
            {/* <ListItem>
          <ListItemText
          primary="下蹲训练"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                由Scott, Alex, Jennifer完成
              </Typography>
              {" --每周下蹲三次"} //description
            </React.Fragment>
          }
        />
            </ListItem> */}
          </List>
        </Grid>
        <Divider></Divider>
        <Grid item>
          <Typography variant="subtitle1">已完成</Typography>
          <List>
              {syncTaskInfo.toDoList.filter(todo => todo.status=="2").map(todo=>{
                return (
                  <ListItem>
          <ListItemText
          primary={todo.content}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                由{syncTaskInfo.allMemberMap[todo.finishUserID]}完成
              </Typography>
              {`----完成于${todo.endDate}`}
            </React.Fragment>
          }
        />
            </ListItem>
                )
              })}
            {/* <ListItem>
          <ListItemText
          primary="下蹲训练"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                由Scott, Alex, Jennifer完成
              </Typography>
              {" --每周下蹲三次"}
            </React.Fragment>
          }
        />
            </ListItem> */}
          </List>
        </Grid>
        <Divider></Divider>
        <Grid item>
          <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
         >
           <Grid item>
             编辑任务完成情况
           </Grid>
           <Grid item>
                 {editingUserIDList.length>0?
                 (
             <Grid container direction="row" alignItems="center">
               <Grid item>
                 正在编辑:
               </Grid>
               <Grid item>
                        <AvatarGroup max={3} style={{right: 0}}>
                          {editingUserIDList.map(editingUserID => {
                            const editingUserName = syncTaskInfo.allMemberMap[editingUserID]
                            return (
                              <Avatar alt={editingUserName} className={classes.avatarSmall}>{editingUserName?.slice(0, 1)||""}</Avatar>
                            )
                            })}
            </AvatarGroup>
               </Grid>
             </Grid>
):
                (<div></div>)
              }

           </Grid>
        </Grid>
        </Grid>
        {
        <Grid item>
          <TextField
          id="myEditTextField"
          InputLabelProps={{ shrink: true }}
          label={syncTaskInfo.allMemberMap[syncTaskInfo.processInfoMap[userID]?.editUserID]||""}
          multiline
          rowsMax={4}
          variant="outlined" style={{width: 700}}
          onChange={handleMyEditChange}
          defaultValue={syncTaskInfo.processInfoMap[userID]?.content||""}
          >
          </TextField>
        </Grid>
        }
        {Object.entries(syncTaskInfo.processInfoMap).filter((processInfo: [string, TaskProcessInfoInterface])=>processInfo[0]!=userID&&editingUserIDList.indexOf(processInfo[0])!=-1).map(
          processInfo => {
            console.log(processInfo[1].content)
            return (
              <Grid item>
          <TextField
          InputLabelProps={{ shrink: true }}
          label={`${syncTaskInfo.allMemberMap[processInfo[1].editUserID]}正在编辑`}
          multiline
          rowsMax={4}
          value={processInfo[1].content}
          inputProps={{readOnly: true}}
          variant="outlined" style={{width: 700}}>
          </TextField>
                </Grid>
            )
          }
        )
        }
        {
        Object.entries(syncTaskInfo.processInfoMap).filter((processInfo: [string, TaskProcessInfoInterface])=>processInfo[0]!=userID&&editingUserIDList.indexOf(processInfo[0])==-1).map(
          processInfo => {
            return (
              <Grid item>
              <Typography>
                {syncTaskInfo.allMemberMap[processInfo[1].editUserID]}编辑于: {processInfo[1].editDate} --
                {processInfo[1].content}
              </Typography>
              </Grid>
            )
          }
        )
        }
           <Grid item>
              <Button variant="outlined" color="primary" onClick={handleEditSubmitClick}>提交编辑</Button>
           </Grid>
      </Grid>

      </Paper>
      <AddToDoDialog handleAddNewToDo={handleAddNewToDo} whetherAddToDo={whetherAddToDo} handleWhetherAddToDo={handleWhetherAddToDo}></AddToDoDialog>
    </div>
  );
}
