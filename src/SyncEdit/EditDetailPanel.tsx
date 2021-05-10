/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 20:06:49
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 01:30:31
 */

import { IconButton, Avatar, Button, Checkbox, createStyles, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, List,  ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
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


interface EditDetailPanelInterface {
  taskID: string;
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
  const ws = React.useRef(new WebSocket(`${wsAddress}/ws?userID=${userID}`))
  const [myEditProcessInfoID, setMyEditProcessInfoID] = React.useState<string>("")
  const [initial, setInitial] = React.useState<number>(1);
  const [editingUserIDList, setEditingUserIDList] = React.useState<Array<string>>([]);
  const [lastEditContent, setLastEditContent] = React.useState<string>("");
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
          }
        )
      )

    }
  }, [initial])
  React.useEffect(() => {
    // return () => ws.current.close();
}, []);
  ws.current.onmessage = (res) => {
    const data = JSON.parse(res.data)
    console.log(data)
    if(data.type == "UserWsSyncEditMessage") {
      const userWsSyncEditMessage: UserWsSyncEditMessage = data as UserWsSyncEditMessage
      console.log(Object.keys(syncTaskInfo.processInfoMap).indexOf(userWsSyncEditMessage.editUserID))
      if(editingUserIDList.indexOf(userWsSyncEditMessage.editUserID)==-1) {
        setEditingUserIDList([
        ...editingUserIDList, userWsSyncEditMessage.editUserID 
      ])}
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
        console.log("outer", syncTaskInfo)
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
    }
  }

  const handleWhetherAddToDo = (val: boolean) => {
    setWhetherAddToDo(val)
  }

  const handleAddToDoClick = () => {
    setWhetherAddToDo(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{

  }

  const handleClosePanel = () => {
    props.handleWhetherEditTask(false);
  }



  return (
    <div>
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
            control={<Checkbox id={todo.taskToDoID} color="primary" onChange={handleChange} name={todo.taskToDoID} />}
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
          <Button variant='outlined' color="primary">通过</Button>
          <Button
            color="inherit"
            variant="outlined"
            style={{ color: '#9c2712', left: 5 }}
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
            <ListItem>
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
            </ListItem>
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
        <Grid item>
          <TextField
          label={"Tianyi"}
          multiline
          rowsMax={4}
          variant="outlined"
           style={{width: 700}}
           >
          </TextField>
        </Grid>
           <Grid item>
              <Button variant="outlined" color="primary">提交编辑</Button>
           </Grid>
      </Grid>

      </Paper>
      <AddToDoDialog whetherAddToDo={whetherAddToDo} handleWhetherAddToDo={handleWhetherAddToDo}></AddToDoDialog>
    </div>
  );
}
