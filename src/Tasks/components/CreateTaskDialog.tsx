import {
  Avatar,
  Button,
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
import { AvatarGroup } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import GroupIcon from '@material-ui/icons/Group';
import { TaskStatusInterface } from './TaskCard';
import { serverAddress } from '../../utils/globals';
import axios from 'axios';
import { UserWebAddTaskMessage } from '../Messages/UserWebAddTaskMessage';

export interface CreateTaskInterface {
  taskID?: string;
  projectID?: string;
  parentID?: string;
  taskName?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  leaders?: { [key: string]: boolean };
  members?: { [key: string]: boolean };
  allMemberMap?: { [key: string]: string };
  childrenMap?: { [key: string]: TaskStatusInterface };
}


export interface TaskAddResult {
  outcome: boolean;
  reason: string;
  taskID: string;
  taskName: string;
}

export interface WebReplyAddTaskMessage {
  type: string;
  taskAddResult: TaskAddResult;
}

interface CreateTaskPropsInterface {
  readonly parentID: string;
  readonly whetherCreateTask: boolean;
  readonly handleWhetherCreateTaskPanel: (val: boolean) => void;
  readonly handleAddTaskList: () => void;
  readonly allMemberMap: { [key: string]: string };
}

const originalFakeSelectMemberMap: { [key: string]: boolean } = {};
fakeMembers.map(
  (fakeMember) => (originalFakeSelectMemberMap[fakeMember] = false)
);

export const convertToSelectIDMap = (map: { [id: string]: string }) => {
  var rst: { [id: string]: boolean } = {};
  Object.entries(map).map((element: [string, string]) => {
    rst[element[0]] = false;
  });
  return rst;
};

export const getSelectedListFromMap = (map: { [id: string]: boolean }) => {
  const rstList: Array<string> = Object.entries(map)
    .filter((element: [string, boolean]) => element[1])
    .map((element: [string, boolean]) => {
      return element[0];
    });
  return rstList;
};

export const CreateTaskDialog = (props: CreateTaskPropsInterface) => {
  const userID = window.localStorage.getItem("userID")||""
  console.log(props.parentID)
  const [taskForm, setTaskForm] = useState<CreateTaskInterface>({
    taskID: '',
    projectID: window.localStorage.getItem('currentProjectID') || '',
    parentID: props.parentID,
    taskName: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    leaders: convertToSelectIDMap(props.allMemberMap),
    members: convertToSelectIDMap(props.allMemberMap),
    allMemberMap: props.allMemberMap,
  });
  useEffect(() => {
    setTaskForm({
      taskID: '',
      projectID: window.localStorage.getItem('currentProjectID') || '',
      parentID: props.parentID,
      taskName: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
      leaders: convertToSelectIDMap(props.allMemberMap),
      members: convertToSelectIDMap(props.allMemberMap),
      allMemberMap: props.allMemberMap,
    });
  }, [props.whetherCreateTask]);

  const getMemberName: (id: string) => string = (memberID: string) => {
    return props.allMemberMap[memberID];
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
    console.log(e.currentTarget.id);
    setTaskForm({
      ...taskForm,
      ['members']: {
        ...taskForm['members'],
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
        ...taskForm['leaders'],
        [e.currentTarget.id]: e.currentTarget.checked,
      },
    });
    // setTaskForm({
    //   ...taskForm,
    //   ['members']: newMembers,
    // });
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
    // TODO ???????????????????????????Task id???????????????task
    const unchangedTaskForm = Object.assign({}, taskForm);
    var recoverMembers: { [key: string]: boolean } = convertToSelectIDMap(
      props.allMemberMap
    );
    var recoverLeaders: { [key: string]: boolean } = convertToSelectIDMap(
      props.allMemberMap
    );
    setTaskForm({
      ...taskForm,
      ['members']: recoverMembers,
      ['leaders']: recoverLeaders,
    });
    const confirmedTaskForm: CreateTaskInterface = {
      ...taskForm,
      ['members']: recoverMembers,
      ['leaders']: recoverLeaders,
    };

    const userWebAddTaskMessage: UserWebAddTaskMessage = {
      type: 'UserWebAddTaskMessage',
      newTask: {
        taskName: taskForm?.taskName || '',
        projectID: taskForm?.projectID || '',
        parentID: taskForm?.parentID || '',
        startDate: taskForm?.startDate?.toLocaleDateString() || '',
        endDate: taskForm?.endDate?.toLocaleDateString() || '',
        description: taskForm?.description || '',
        leaderIDList: getSelectedListFromMap(taskForm?.leaders || {}),
        userIDList: getSelectedListFromMap(taskForm?.members || {}),
      },
    };
    const addTaskPromise = () =>
      axios.post(`${serverAddress}/web`, JSON.stringify(userWebAddTaskMessage));
    axios.all([addTaskPromise()]).then(
      axios.spread((addTaskRst) => {
        const webReplyAddTaskMessage: WebReplyAddTaskMessage = addTaskRst.data
        const taskAddResult: TaskAddResult = webReplyAddTaskMessage.taskAddResult;
        if(taskAddResult.outcome) {
          props.handleAddTaskList();
        }
      })
    );
    props.handleWhetherCreateTaskPanel(false);

  };

  const handleCancelClick = () => {
    props.handleWhetherCreateTaskPanel(false);
  };

  const getSelectMemberIDMapDialog = () => {
    // console.log('get', taskForm?.members);
    return (
      <SelectMemberDialog
        whetherSelectMember={whetherSelectMember}
        handleWhetherSelectMember={handleWhetherSelectMember}
        handleCheckMember={handleCheckMember}
        memberIDSelectMap={taskForm?.members || {}}
        handleCancelClick={handleCancelCheckMemberClick}
        allMemberMap={taskForm?.allMemberMap || {}}
      ></SelectMemberDialog>
    );
  };

  return (
    <Dialog
      open={props.whetherCreateTask}
      scroll="paper"
      style={{ marginTop: '65px', height: '500px' }}
    >
      <MuiDialogTitle disableTypography id="create-task-dialog-title">
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
            <IconButton
              style={{ right: 0 }}
              onClick={() => props.handleWhetherCreateTaskPanel(false)}
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
              <FormControl>
                <InputLabel htmlFor="taskName">????????????</InputLabel>
                <Input
                  id="taskName"
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
                    value={taskForm['startDate']}
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
                    value={taskForm['endDate']}
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
                allMemberMap={taskForm?.allMemberMap||{}}
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
                      .map((leader: [string, boolean]) => (
                        <Avatar alt={getMemberName(leader[0])}>
                          {getMemberName(leader[0]).slice(0, 1)}
                        </Avatar>
                      ))}
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
                  .map((leader: [string, boolean]) => (
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar alt={getMemberName(leader[0])} id={leader[0]}>
                          {props.allMemberMap[leader[0]].slice(0, 1)}
                        </Avatar>
                      </Grid>
                      <Grid item>{getMemberName(leader[0])}</Grid>
                    </Grid>
                  ))}
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
              {getSelectMemberIDMapDialog()}
              {/* <SelectMemberDialog
                whetherSelectMember={whetherSelectMember}
                handleWhetherSelectMember={handleWhetherSelectMember}
                handleCheckMember={handleCheckMember}
                memberIDSelectMap={taskForm?.members||{}}
                handleCancelClick={handleCancelCheckMemberClick}
              ></SelectMemberDialog> */}
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
                      .filter((member: [string, boolean], value) => member[1])
                      .map((member: [string, boolean]) => (
                        <Avatar alt={getMemberName(member[0])} id={member[0]}>
                          {getMemberName(member[0]).slice(0, 1)}
                        </Avatar>
                      ))}
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
                  .map((member: [string, boolean]) => (
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar alt={getMemberName(member[0])}>
                          {getMemberName(member[0]).slice(0, 1)}
                        </Avatar>
                      </Grid>
                      <Grid item>{getMemberName(member[0])}</Grid>
                    </Grid>
                  ))}
              </Collapse>
            </ListItem>
            <Divider></Divider>
            <ListItem id="task-description-list-item">
              <FormControl>
                <InputLabel htmlFor="taskDescription">????????????</InputLabel>
                <Input
                  id="taskDescription"
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
