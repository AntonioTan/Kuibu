
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
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

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
import { fakeMembers } from '../../utils/mock';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import { AvatarGroup } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import GroupIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { UserWebGetUserNameMessage } from '../Messages/UserWebGetUserNameMessage';
import { serverAddress } from '../../utils/globals';
import axios from 'axios';
import { WebReplyGetUserNameMessage } from '../Messages/WebReplyGetUserNameMessage';
import { TaskToDoInfoInterface } from '../DataInterface/TaskToDoInfoInterface';

interface AddToDoDialogInterface {
  whetherAddToDo: boolean;
  handleWhetherAddToDo: (val: boolean)=>void;
  handleAddNewToDo: (val: TaskToDoInfoInterface) => void;
}




export const AddToDoDialog = (props: AddToDoDialogInterface) => {
  const userID = window.localStorage.getItem("userID")||""
  const [initial, setInitial] = useState<number>(1);
  const [userName, setUserName] = useState<string>("正在获取")
  const [toDoForm, setToDoForm] = useState<TaskToDoInfoInterface>({
    taskToDoID: "",
    createUserID: userID,
    finishUserID: "",
    content: "",
    startDate: "",
    endDate: "",
    status: "0",
  })

  const handleToDoContentChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    setToDoForm({
      ...toDoForm,
      ['content']: e.currentTarget.value
    })
  }

  React.useEffect(
    () => {
      const userID: string = window.localStorage.getItem("userID")||""
      if(userID != "") {
      const userWebGetUserNameMessage: UserWebGetUserNameMessage = {
        type: "UserWebGetUserNameMessage",
        userID: userID
      }
      const userWebGetUserNamePromise = () => axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetUserNameMessage)
      )
      axios.all([userWebGetUserNamePromise()]).then(
        axios.spread((
          userWebGetUserNameRst
        )=>{
          const webReplyGetUserNameMessage: WebReplyGetUserNameMessage = userWebGetUserNameRst.data as WebReplyGetUserNameMessage
          setUserName(webReplyGetUserNameMessage.userName);
        })
      )

      }
      setInitial(0)
    }, [initial]
  )

  const handleConfirmClick = () => {
    props.handleAddNewToDo(toDoForm);
    props.handleWhetherAddToDo(false);
  }

  const handleCancelClick = () => {
    props.handleWhetherAddToDo(false);
  }
  return (
    <Dialog
    open={props.whetherAddToDo}
    style={{height: '450px', width: '1000px'}}
    scroll="paper"
    classes={{ paper: "{minWidth: '1400px"}}
    >
      <MuiDialogTitle disableTypography id="add-todo-dialog-title">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6" style={{ userSelect: 'none' }}>
              添加ToDo
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              style={{ right: 0 }}
              onClick={() => props.handleWhetherAddToDo(false)}
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
                  value={userName}
                  style={{ width: '350px' }}
                ></Input>
              </FormControl>
            </ListItem>
            {/* <ListItem>
              <Typography>To Do内容</Typography>
            </ListItem> */}
            <ListItem>
              <TextField label="To Do内容" style={{width: 600}} onChange={handleToDoContentChange}></TextField>
            </ListItem>
          </List>
        </DialogContentText>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConfirmClick}
          >
            完成
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
}
