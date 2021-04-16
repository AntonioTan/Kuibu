/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-16 09:29:30
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-16 19:48:07
 */

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
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';

interface EditTaskPropsInterface {
  readonly whetherEditTask: boolean;
  readonly handleWhetherEditTaskPanel: (val: boolean) => void;
}

export const EditTaskDialog = (props: EditTaskPropsInterface) => {
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
              编辑任务名字
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssignmentReturnIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ right: 0 }}
              onClick={() => props.handleWhetherEditTaskPanel(false)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiDialogTitle>
    </Dialog>
  );
};
