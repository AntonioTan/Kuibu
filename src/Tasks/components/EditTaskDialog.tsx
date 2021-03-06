/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-16 09:29:30
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 10:45:13
 */

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DialogContentText from '@material-ui/core/DialogContentText';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { SelectMemberDialog } from './SelectMemberDialog';
import { fakeMembers } from '../../utils/mock';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import { AvatarGroup } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import GroupIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';

import { convertToSelectIDMap, CreateTaskDialog, CreateTaskInterface } from './CreateTaskDialog';
import {
  TaskInterface,
  TaskStatusInterface,
  WebReplyTaskInterface,
} from './TaskCard';
import axios from 'axios';
import { serverAddress } from '../../utils/globals';
import { UserWebGetCompleteTaskInfoMessage } from '../Messages/UserWebGetCompleteTaskInfoMessage';

interface EditTaskPropsInterface {
  readonly whetherEditTask: boolean;
  readonly handleWhetherEditTaskPanel: (val: boolean) => void;
  readonly allMemberMap: {[key: string]: string};
  taskID: string;
}

export const EditTaskDialog = (props: EditTaskPropsInterface) => {
  const userID = window.localStorage.getItem("userID")||""
  const [initial, setInitial] = useState<number>(1);
  const [taskID, setTaskID] = useState<string>(props.taskID);
  const [taskForm, setTaskForm] = useState<CreateTaskInterface | null>();
  const [targetTask, setTargetTask] = useState<TaskInterface | null>();
  // Create Task Park Logic
  const [whetherCreateTask, setWhetherCreateTask] = useState<boolean>(false);
  const [allMemberMap, setAllMemberMap] = useState<{[key: string]: string}>({});
  useEffect(() => {
    setTaskID(props.taskID)
  }, [props.whetherEditTask])

  useEffect(() => {
    console.log(taskID)
    if(taskID!="") {
    const userWebGetCompleteTaskInfoMessage: UserWebGetCompleteTaskInfoMessage = {
      type: 'UserWebGetCompleteTaskInfoMessage',
      taskID: taskID,
    };
    const getCompleteTaskInfoPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetCompleteTaskInfoMessage)
      );
    axios.all([getCompleteTaskInfoPromise()]).then(
      axios.spread((getCompleteTaskInfoRst) => {
        const webReplyTaskCompleteInfo: WebReplyTaskInterface =
          getCompleteTaskInfoRst.data.taskCompleteInfo;
        var sessionDateMap: {[key: string]: Date} = {}
        Object.entries(webReplyTaskCompleteInfo.sessionDateMap).map(
            (sessionDate: [string, string]) => {
              sessionDateMap[sessionDate[0]] = new Date(sessionDate[1])
            }
         )
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
          sessionDateMap: sessionDateMap,
        };
        setTaskID(taskCompleteInfo.taskID);
        setTargetTask(taskCompleteInfo);
        var leaders: { [key: string]: boolean } = convertToSelectIDMap(props.allMemberMap);
        var members: { [key: string]: boolean } = {};

        Object.entries(taskCompleteInfo.leaderMap).map(
          (leader: [string, string]) => {
            console.log(leader[0])
            leaders[leader[0]] = true;
          }
        );
        Object.entries(taskCompleteInfo.userMap).map(
          (member: [string, string]) => {
            // leaders[member[0]] = false;
            console.log(member[0])
            members[member[0]] = true;
          }
        );
        Object.entries(leaders).map(
          (leader: [string, boolean]) => {
            if(members[leader[0]]!=true&&leader[1]==false) members[leader[0]] = false;
          }
        )
        const taskForm: CreateTaskInterface = {
          taskID: taskCompleteInfo.taskID,
          taskName: taskCompleteInfo.taskName,
          projectID: taskCompleteInfo.projectID,
          parentID: taskCompleteInfo.parentID,
          startDate: taskCompleteInfo.startDate,
          endDate: taskCompleteInfo.endDate,
          description: taskCompleteInfo.description,
          leaders: leaders,
          members: members,
          allMemberMap: props.allMemberMap,
          childrenMap: taskCompleteInfo.childrenMap,
        };
        console.log(taskForm?.allMemberMap)
        setAllMemberMap(taskForm?.allMemberMap||{});
        setTaskForm(taskForm);
        })
    )
        setInitial(0)
      }
  }, [initial,props.whetherEditTask,taskID]);

  const handleWhetherCreateTask = (val: boolean) => {
    setWhetherCreateTask(val);
  };

  const handleAddTaskList = () => {
    setInitial(1);
    // var newChildrenList: Array<CreateTaskInterface> = [];
    // Object.assign(newChildrenList, taskForm['childrenList']);
    // newChildrenList.push(newTask);
    // setTaskForm({
    //   ...taskForm,
    //   ['childrenList']: newChildrenList,
    // });
  };

  const [whetherOpenSelectedMembers, setWhetherOpenSelectedMembers] = useState<
    boolean
  >(false);

  const [whetherOpenSelectedLeaders, setWhetherOpenSelectedLeaders] = useState<
    boolean
  >(false);

  const [whetherSelectMember, setWhetherSelectMember] = useState<boolean>(
    false
  );

  const [whetherSelectLeader, setWhetherSelectLeader] = useState<boolean>(
    false
  );

  type taskInterfaceKeys = keyof CreateTaskInterface;

  const handleStartDateChange = (
    key: taskInterfaceKeys,
    value: MaterialUiPickersDate
  ) => {
    setTaskForm({ ...taskForm, [key]: value });
  };

  const handleWhetherSelectMember = (val: boolean) => {
    setWhetherSelectMember(val);
  };
  const handleWhetherSelectLeader = (val: boolean) => {
    setWhetherSelectLeader(val);
  };

  const handleCheckMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.name);
    setTaskForm({
      ...taskForm,
      ['members']: {
        ...taskForm?.members,
        [e.currentTarget.id]: e.currentTarget.checked,
      },
    });
  };

  const handleCancelCheckMemberClick = () => {
    var newMembers: { [key: string]: boolean } = {};
    Object.entries(taskForm?.members || {}).map((member: [string, boolean]) => {
      newMembers[member[0]] = false;
    });
    setTaskForm({
      ...taskForm,
      ['members']: newMembers,
    });
  };

  const handleCheckLeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    var newMembers: { [key: string]: boolean } = {};

    Object.entries(taskForm?.leaders || {}).map((leader: [string, boolean]) => {
      if (!leader[1] && leader[0] != e.currentTarget.id)
        newMembers[leader[0]] = false;
    });

    setTaskForm({
      ...taskForm,
      ['members']: newMembers,
      ['leaders']: {
        ...taskForm?.leaders,
        [e.currentTarget.id]: e.currentTarget.checked,
      },
    });
  };

  const handleCancelCheckLeaderClick = () => {
    var newLeaders: { [key: string]: boolean } = {};
    var newMembers: { [key: string]: boolean } = {};
    Object.entries(taskForm?.leaders || {}).map((leader: [string, boolean]) => {
      newLeaders[leader[0]] = false;
      newMembers[leader[0]] = false;
    });
    setTaskForm({
      ...taskForm,
      ['leaders']: newLeaders,
      ['members']: newMembers,
    });
  };

  const handleWhetherOpenSelectedMembers = () => {
    setWhetherOpenSelectedMembers(!whetherOpenSelectedMembers);
  };
  const handleWhetherOpenSelectedLeaders = () => {
    setWhetherOpenSelectedLeaders(!whetherOpenSelectedLeaders);
  };

  const handleTaskDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskForm({
      ...taskForm,
      ['description']: event.currentTarget.value,
    });
  };

  const handleTaskNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskForm({
      ...taskForm,
      ['taskName']: event.currentTarget.value,
    });
  };

  const handleConfirmClick = () => {
    // props.handleAddTaskList(taskForm);
    props.handleWhetherEditTaskPanel(false);
  };

  const handleCancelClick = () => {
    props.handleWhetherEditTaskPanel(false);
  };

  const handleCreateChildTask = () => {
    setWhetherCreateTask(true);
  };

  const handleGoToParentTaskClick = () => {
    setTaskID(taskForm?.parentID||taskID)
  }

  const getMemberName: (id: string) => string = (memberID: string) => {
    const allMemberMap = taskForm?.allMemberMap || {}
    const memberName = allMemberMap[memberID] || ""
    return memberName
  }

  const getChildTaskMemberMap: () => {[key: string]: string} = () => {
    var childTaskMemberMap: {[key: string]: string} = {}
    Object.entries(taskForm?.leaders||{}).map(
      (leader: [string, boolean]) => {
        if(leader[1]) {
          childTaskMemberMap[leader[0]] = getMemberName(leader[0])
        }
      }
    )
    Object.entries(taskForm?.members||{}).map(
      (member: [string, boolean]) => {
        if(member[1]) {
          childTaskMemberMap[member[0]] = getMemberName(member[0])
        }
      }
    )
    return childTaskMemberMap;
  }


  return (
    <Dialog
      open={props.whetherEditTask}
      style={{ height: '650px', width: '1000px' }}
      scroll="paper"
      classes={{ paper: "{minWidth: '1400px'}" }}
    >
      <MuiDialogTitle disableTypography id="edit-task-dialog-title">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6" style={{ userSelect: 'none' }}>
              ????????????
            </Typography>
          </Grid>
          <Grid item>
            {taskForm?.parentID!=''?(<IconButton onClick={handleGoToParentTaskClick}>
              <AssignmentReturnIcon color="primary" />
            </IconButton>):<div></div>}

            <IconButton
              style={{ right: 0 }}
              onClick={() => props.handleWhetherEditTaskPanel(false)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiDialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          <List>
            <ListItem id="edit-task-list-item">
              {/* <FormControl>
                <InputLabel htmlFor="taskDescription">????????????</InputLabel>
                <Input
                  id="taskDescription"
                  value={taskForm.description}
                  onChange={handleTaskDescriptionChange}
                  style={{ width: '350px' }}
                ></Input>
              </FormControl> */}
              <FormControl>
                <InputLabel htmlFor="taskName" shrink={true}>????????????</InputLabel>
                <Input
                  id="taskName"
                  value={taskForm?.taskName}
                  style={{ width: '350px' }}
                  onChange={handleTaskNameChange}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem id="creater-list-item">
              <FormControl>
                <InputLabel htmlFor="leader">?????????</InputLabel>
                <Input
                  id="leader"
                  disabled={true}
                  value={getMemberName(userID)}
                  style={{ width: '350px' }}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem id="start-date-list-item">
              <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="????????????????????????"
                    style={{ width: '350px' }}
                    value={taskForm?.startDate}
                    onChange={(value) =>
                      handleStartDateChange('startDate', value)
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change start date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </ListItem>
            <ListItem id="end-date-list-item">
              <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="??????????????????????????????"
                    style={{ width: '350px' }}
                    value={taskForm?.endDate}
                    onChange={(value) =>
                      handleStartDateChange('endDate', value)
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change end date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </ListItem>
            <ListItem id="pick-leader-list-item">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setWhetherSelectLeader(true)}
                startIcon={<FlagIcon color="primary" />}
              >
                ???????????????
              </Button>
              <SelectMemberDialog
                whetherSelectMember={whetherSelectLeader}
                handleWhetherSelectMember={handleWhetherSelectLeader}
                handleCheckMember={handleCheckLeader}
                memberIDSelectMap={taskForm?.leaders || {}}
                handleCancelClick={handleCancelCheckLeaderClick}
                allMemberMap={allMemberMap}
              ></SelectMemberDialog>
            </ListItem>

            <ListItem
              id="picked-leader-list-item"
              button
              onClick={handleWhetherOpenSelectedLeaders}
            >
              <ListItemText
                primary="??????????????????:"
                secondary={
                  <AvatarGroup max={2}>
                    {Object.entries(taskForm?.leaders || {})
                      .filter((leader: [string, boolean], value) => leader[1])
                      .map((leader: [string, boolean]) => {
                        const leaderName = getMemberName(leader[0])
                        return (
                        <Avatar alt={leaderName}>{leaderName.slice(0, 1)}</Avatar>
                      )})}
                  </AvatarGroup>
                }
                style={{ fontSize: '14px' }}
                primaryTypographyProps={{ variant: 'inherit' }}
              ></ListItemText>
              {whetherOpenSelectedLeaders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <ListItem id="display-picked-leader-list-item">
              <Collapse in={whetherOpenSelectedLeaders}>
                {Object.entries(taskForm?.leaders || {})
                  .filter((leader: [string, boolean], value) => leader[1])
                  .map((leader: [string, boolean]) => {
                    const leaderName = getMemberName(leader[0]);
                    return (
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar alt={leaderName}>
                          {leaderName.slice(0, 1)}
                        </Avatar>
                      </Grid>
                      <Grid item>{leaderName}</Grid>
                    </Grid>
                  )
                  })}
              </Collapse>
            </ListItem>
            <Divider></Divider>
            <ListItem id="pick-member-list-item">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setWhetherSelectMember(true)}
                startIcon={<GroupIcon color="primary" />}
              >
                ????????????
              </Button>
              <SelectMemberDialog
                whetherSelectMember={whetherSelectMember}
                handleWhetherSelectMember={handleWhetherSelectMember}
                handleCheckMember={handleCheckMember}
                memberIDSelectMap={taskForm?.members || {}}
                handleCancelClick={handleCancelCheckMemberClick}
                allMemberMap={allMemberMap}
              ></SelectMemberDialog>
            </ListItem>
            <ListItem
              id="picked-list-item"
              button
              onClick={handleWhetherOpenSelectedMembers}
            >
              <ListItemText
                primary="???????????????:"
                secondary={
                  <AvatarGroup max={4}>
                    {Object.entries(taskForm?.members || {})
                      .filter((member: [string, boolean]) => member[1])
                      .map((member: [string, boolean]) => {
                        const memberName = getMemberName(member[0])
                        return (
                        <Avatar alt={memberName}>
                          {memberName.slice(0,1)}
                        </Avatar>
                      )})}
                  </AvatarGroup>
                }
                style={{ fontSize: '14px' }}
                primaryTypographyProps={{ variant: 'inherit' }}
              ></ListItemText>
              {whetherOpenSelectedMembers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <ListItem id="display-picked-list-item">
              <Collapse in={whetherOpenSelectedMembers}>
                {Object.entries(taskForm?.members || {})
                  .filter((member: [string, boolean], value) => member[1])
                  .map((member: [string, boolean]) => {
                    const memberName = getMemberName(member[0])
                    return(
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar alt={memberName}>{memberName.slice(0, 1)}</Avatar>
                      </Grid>
                      <Grid item>{memberName}</Grid>
                    </Grid>
                  )})}
              </Collapse>
            </ListItem>
            <Divider></Divider>
            <ListItem id="task-escription-list-item">
              <FormControl>
                <InputLabel htmlFor="taskDescription" shrink={true}>????????????</InputLabel>
                <Input
                  id="taskDescription"
                  value={taskForm?.description}
                  onChange={handleTaskDescriptionChange}
                  style={{ width: '350px' }}
                ></Input>
              </FormControl>
              {/* <TextField
                variant="outlined"
                label="????????????"
                onChange={handleTaskDescriptionChange}
                style={{ width: '350px' }}
              ></TextField> */}
            </ListItem>
            <Divider></Divider>
            <ListItem>
              <Card>
                <CardContent style={{ minWidth: '400px' }}>
                  <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <Typography>???????????????</Typography>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleCreateChildTask}>
                            <AddIcon color="primary" />
                          </IconButton>
                          <CreateTaskDialog
                            parentID={taskID}
                            whetherCreateTask={whetherCreateTask}
                            handleWhetherCreateTaskPanel={
                              handleWhetherCreateTask
                            }
                            handleAddTaskList={handleAddTaskList}
                            allMemberMap={
                              getChildTaskMemberMap()
                              // taskForm?.allMemberMap || {}
                            }
                          ></CreateTaskDialog>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Divider></Divider>
                    </Grid>
                    {Object.entries(taskForm?.childrenMap || {}).map(
                      (child: [string, TaskStatusInterface]) => {
                        return (
                          <Grid item>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Grid item style={{ width: '200px' }}>
                                <Typography>{child[1].taskName}</Typography>
                              </Grid>
                              <Grid item>
                                {child[1].status ? '?????????' : '?????????'}
                              </Grid>
                              <Grid item>
                                <Button variant="outlined" color="primary" onClick={()=>{
                                  console.log("child id", child[0])
                                  setTaskID(child[0])
                                  setInitial(1)
                                }}>
                                  ??????
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  color="inherit"
                                  style={{ color: '#9c2712' }}
                                >
                                  ??????
                                </Button>
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </ListItem>
          </List>
        </DialogContentText>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConfirmClick}
          >
            ??????
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            style={{ color: '#9c2712', left: 0 }}
            onClick={handleCancelClick}
          >
            ??????
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
