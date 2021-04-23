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

import React, { useState } from 'react';
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

interface CreateTaskPropsInterface {
  readonly whetherCreateTask: boolean;
  readonly handleWhetherCreateTaskPanel: (val: boolean) => void;
  readonly handleAddTaskList: (newTask: CreateTaskInterface) => void;
  readonly allMemberMap: { [key: string]: string };
}

const originalFakeSelectMemberMap: { [key: string]: boolean } = {};
fakeMembers.map(
  (fakeMember) => (originalFakeSelectMemberMap[fakeMember] = false)
);

const convertToSelectIDMap = (map: { [id: string]: string }) => {
  var rst: { [id: string]: boolean } = {};
  Object.entries(map).map((element: [string, string]) => {
    rst[element[0]] = false;
  });
  return rst;
};

export const CreateTaskDialog = (props: CreateTaskPropsInterface) => {
  const [taskForm, setTaskForm] = useState<CreateTaskInterface>({
    taskID: '',
    projectID: window.localStorage.getItem('currentProjectID') || '',
    parentID: '',
    taskName: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    leaders: originalFakeSelectMemberMap,
    members: originalFakeSelectMemberMap,
    allMemberMap: props.allMemberMap,
  });
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
        ...taskForm['members'],
        [e.currentTarget.name]: e.currentTarget.checked,
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
      if (!leader[1] && leader[0] != e.currentTarget.name)
        newMembers[leader[0]] = false;
    });

    setTaskForm({
      ...taskForm,
      ['members']: newMembers,
      ['leaders']: {
        ...taskForm['leaders'],
        [e.currentTarget.name]: e.currentTarget.checked,
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
    // TODO 这里需要从后端获取Task id再更新新的task
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
    props.handleAddTaskList(unchangedTaskForm);
    props.handleWhetherCreateTaskPanel(false);
  };

  const handleCancelClick = () => {
    props.handleWhetherCreateTaskPanel(false);
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
              创建任务
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
                <InputLabel htmlFor="taskName">任务名称</InputLabel>
                <Input
                  id="taskName"
                  style={{ width: '350px' }}
                  onChange={handleTaskNameChange}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem id="creater-list-item">
              <FormControl>
                <InputLabel htmlFor="leader">创建人</InputLabel>
                <Input
                  id="leader"
                  disabled={true}
                  value="谭天一"
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
                    label="选择任务开始日期"
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
                    label="选择任务预计结束日期"
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
                选取负责人
              </Button>
              <SelectMemberDialog
                whetherSelectMember={whetherSelectLeader}
                handleWhetherSelectMember={handleWhetherSelectLeader}
                handleCheckMember={handleCheckLeader}
                memberIDSelectMap={taskForm?.leaders || {}}
                handleCancelClick={handleCancelCheckLeaderClick}
              ></SelectMemberDialog>
            </ListItem>

            <ListItem
              id="picked-leader-list-item"
              button
              onClick={handleWhetherOpenSelectedLeaders}
            >
              <ListItemText
                primary="已选取负责人:"
                secondary={
                  <AvatarGroup max={2}>
                    {Object.entries(taskForm?.leaders || {})
                      .filter((leader: [string, boolean], value) => leader[1])
                      .map((leader: [string, boolean]) => (
                        <Avatar alt={leader[0]}>{leader[0].slice(0, 1)}</Avatar>
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
                        <Avatar alt={leader[0]}>{leader[0].slice(0, 1)}</Avatar>
                      </Grid>
                      <Grid item>{leader[0]}</Grid>
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
                选取组员
              </Button>
              <SelectMemberDialog
                whetherSelectMember={whetherSelectMember}
                handleWhetherSelectMember={handleWhetherSelectMember}
                handleCheckMember={handleCheckMember}
                memberIDSelectMap={taskForm?.members || {}}
                handleCancelClick={handleCancelCheckMemberClick}
              ></SelectMemberDialog>
            </ListItem>
            <ListItem
              id="picked-list-item"
              button
              onClick={handleWhetherOpenSelectedMembers}
            >
              <ListItemText
                primary="已选取组员:"
                secondary={
                  <AvatarGroup max={4}>
                    {Object.entries(taskForm?.members || {})
                      .filter((member: [string, boolean], value) => member[1])
                      .map((member: [string, boolean]) => (
                        <Avatar alt={member[0]}>{member[0].slice(0, 1)}</Avatar>
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
                        <Avatar alt={member[0]}>{member[0].slice(0, 1)}</Avatar>
                      </Grid>
                      <Grid item>{member[0]}</Grid>
                    </Grid>
                  ))}
              </Collapse>
            </ListItem>
            <Divider></Divider>
            <ListItem id="task-description-list-item">
              <FormControl>
                <InputLabel htmlFor="taskDescription">任务描述</InputLabel>
                <Input
                  id="taskDescription"
                  onChange={handleTaskDescriptionChange}
                  style={{ width: '350px' }}
                ></Input>
              </FormControl>
              {/* <TextField
                variant="outlined"
                label="任务描述"
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
            确定
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            style={{ color: '#9c2712', left: 0 }}
            onClick={handleCancelClick}
          >
            取消
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
