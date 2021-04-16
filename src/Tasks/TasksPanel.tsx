/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 09:31:10
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-16 09:29:46
 */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import SearchBar from 'material-ui-search-bar';
import AddBox from '@material-ui/icons/AddBox';
import React, { useState } from 'react';
import { TaskCard } from './components/TaskCard';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DialogContentText from '@material-ui/core/DialogContentText';
import Draggable from 'react-draggable';
import { CheckBox } from '@material-ui/icons';
import { CreateTaskDialog } from './components/CreateTaskDialog';

const originalTaskNames = [
  '完成开题报告',
  '写前端代码',
  '写后端代码',
  '完成中期答辩',
  '完成开题报告',
  '写前端代码',
  '写后端代码',
  '完成中期答辩',
];

export const TasksPanel = () => {
  const [searched, setSearched] = useState<string>('');
  const [taskNames, setTaskNames] = useState<string[]>(originalTaskNames);
  const [whetherCreateTask, setWhetherCreateTask] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [whetherSelectMember, setWhetherSelectMember] = useState<boolean>(
    false
  );
  const requestSearch = (searchedVal: string) => {
    const filteredTaskNames = originalTaskNames.filter(
      (taskName) => taskName.indexOf(searchedVal) != -1
    );
    setTaskNames(filteredTaskNames);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const handleOpenCreateTaskPanel = () => {
    setWhetherCreateTask(true);
  };

  const handleWhetherCreateTaskPanel = () => {
    setWhetherCreateTask(false);
  };

  const handleStartDateChange = (value: MaterialUiPickersDate) => {
    setStartDate(value);
  };

  const handleSelectMember = (val: boolean) => {
    setWhetherSelectMember(val);
  };

  function PaperComponent() {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper />
      </Draggable>
    );
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        style={{
          // marginTop: '70px',
          width: '700px',
          height: '600px',
        }}
        justify="center"
      >
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              ></SearchBar>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="addTask"
                color="primary"
                onClick={handleOpenCreateTaskPanel}
              >
                <AddBox fontSize="large"></AddBox>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <CreateTaskDialog
          whetherCreateTask={whetherCreateTask}
          handleWhetherCreateTaskPanel={handleWhetherCreateTaskPanel}
        ></CreateTaskDialog>

        <Grid item>
          <Grid container direction="row" justify="space-evenly" spacing={2}>
            {taskNames.map((name, index) => {
              return (
                <Grid item style={{ width: '340px' }}>
                  <TaskCard></TaskCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
