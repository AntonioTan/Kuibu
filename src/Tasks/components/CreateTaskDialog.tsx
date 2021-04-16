import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
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

interface TaskInterface {
  taskName: string;
  startDate?: Date;
  endDate?: Date;
  leader: string;
  members: { [key: string]: boolean };
}

interface TaskPropsInterface {
  readonly whetherCreateTask: boolean;
  readonly handleWhetherCreateTaskPanel: (val: boolean) => void;
}

const originalFakeSelectMemberMap: { [key: string]: boolean } = {};
fakeMembers.map(
  (fakeMember) => (originalFakeSelectMemberMap[fakeMember] = false)
);

export const CreateTaskDialog = (props: TaskPropsInterface) => {
  const [taskForm, setTaskForm] = useState<TaskInterface>({
    taskName: '',
    startDate: new Date(),
    endDate: new Date(),
    leader: '',
    members: originalFakeSelectMemberMap,
  });

  const [whetherSelectMember, setWhetherSelectMember] = useState<boolean>(
    false
  );
  type taskInterfaceKeys = keyof TaskInterface;

  const handleStartDateChange = (
    key: taskInterfaceKeys,
    value: MaterialUiPickersDate
  ) => {
    setTaskForm({ ...taskForm, [key]: value });
  };

  const handleWhetherSelectMember = (val: boolean) => {
    setWhetherSelectMember(val);
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

  return (
    <Dialog
      open={props.whetherCreateTask}
      scroll="paper"
      style={{ marginTop: '65px', height: '500px' }}
    >
      <MuiDialogTitle disableTypography id="simple-dialog-title">
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
            <ListItem>
              <FormControl>
                <InputLabel htmlFor="leader">创建人</InputLabel>
                <Input
                  id="leader"
                  disabled={true}
                  value="谭天一"
                  style={{ width: '300px' }}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="选择任务开始日期"
                    style={{ width: '300px' }}
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
            <ListItem>
              <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="选择任务预计结束日期"
                    style={{ width: '300px' }}
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
            <ListItem>
              <FormGroup row={false}>
                {fakeMembers.map((memberName: string) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={memberName}
                          checked={taskForm['members'][memberName]}
                          onChange={handleCheckMember}
                          color="primary"
                        ></Checkbox>
                      }
                      label={memberName}
                    ></FormControlLabel>
                  );
                })}
              </FormGroup>
            </ListItem>
            <ListItem>
              <Button onClick={() => setWhetherSelectMember(true)}>
                选取组员
              </Button>
              <SelectMemberDialog
                whetherSelectMember={whetherSelectMember}
                handleWhetherSelectMember={handleWhetherSelectMember}
                handleCheckMember={handleCheckMember}
                members={taskForm.members}
              ></SelectMemberDialog>
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
