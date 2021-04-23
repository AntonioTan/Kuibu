/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 09:31:10
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-23 15:17:35
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
import React, { useEffect, useState } from 'react';
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
import {
  CreateTaskDialog,
  CreateTaskInterface,
} from './components/CreateTaskDialog';
import { EditTaskDialog } from './components/EditTaskDialog';
import { serverAddress } from '../utils/globals';
import axios from 'axios';

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

interface TasksPanelInterface {
  taskMap?: { [key: string]: string };
}

export const TasksPanel = (props: TasksPanelInterface) => {
  const [initial, setInitial] = useState<number>(1);
  const [searched, setSearched] = useState<string>('');
  const [allMemberMap, setAllMemberMap] = useState<{
    [key: string]: string;
  } | null>(props?.taskMap || {});
  const [taskNames, setTaskNames] = useState<string[]>(originalTaskNames);
  const [whetherCreateTask, setWhetherCreateTask] = useState(false);
  const [whetherEditTask, setWhetherEditTask] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [whetherSelectMember, setWhetherSelectMember] = useState<boolean>(
    false
  );
  const [taskList, setTaskList] = useState<Array<CreateTaskInterface>>([]);

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

  const handleWhetherCreateTask = (val: boolean) => {
    setWhetherCreateTask(val);
  };

  const handleWhetherEditTaskPanel = (val: boolean) => {
    setWhetherEditTask(val);
  };

  const handleStartDateChange = (value: MaterialUiPickersDate) => {
    setStartDate(value);
  };

  const handleSelectMember = (val: boolean) => {
    setWhetherSelectMember(val);
  };

  const openEditTaskPanel = () => {
    setWhetherEditTask(true);
  };

  const handleAddTaskList = (newTask: CreateTaskInterface) => {
    var newTaskList: Array<CreateTaskInterface> = [];
    Object.assign(newTaskList, taskList);
    newTaskList.push(newTask);
    setTaskList(newTaskList);
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
        direction="column"
        style={{
          // marginTop: '70px',
          width: '700px',
          height: '600px',
        }}

        // justify="center"
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
                onClick={() => handleWhetherCreateTask(true)}
              >
                <AddBox fontSize="large"></AddBox>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <CreateTaskDialog
          whetherCreateTask={whetherCreateTask}
          handleWhetherCreateTaskPanel={handleWhetherCreateTask}
          handleAddTaskList={handleAddTaskList}
          allMemberMap={props?.taskMap || {}}
        ></CreateTaskDialog>
        <Grid item>
          <Grid container direction="row" justify="space-evenly" spacing={2}>
            {Object.entries(props?.taskMap || {}).map(
              (task: [string, string]) => {
                return (
                  <Grid item style={{ width: '340px' }}>
                    <TaskCard
                      openEditTaskPanel={openEditTaskPanel}
                      taskID={task[0]}
                    ></TaskCard>
                    <EditTaskDialog
                      whetherEditTask={whetherEditTask}
                      handleWhetherEditTaskPanel={handleWhetherEditTaskPanel}
                      taskID={task[0]}
                    ></EditTaskDialog>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
