/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 00:12:37
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-02 12:08:18
 */

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Flipped } from 'react-flip-toolkit';
import { SelectMemberDialog } from '../../Tasks/Components/SelectMemberDialog';
import GroupIcon from '@material-ui/icons/Group';
import { fakeMembers } from '../../utils/mock';
import { AvatarGroup } from '@material-ui/lab';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { serverAddress } from '../../utils/globals';
import axios from 'axios';
import { UserContext } from '../../utils/components/UserContext';
import {
  UserBasicInfo,
  UserWebBasicUserInfoMessage,
  WebReplyBasicUserInfoMessage,
} from '../../Login/views/LoginPanel';

export interface ProjectInterface {
  projectID: string;
  projectName: string;
  createUserID: string;
  createUserName: string;
  description: string;
  startDate: Date;
  selectMemberIDs: { [key: string]: boolean };
  memberMap?: { [key: string]: string };
}

interface CreateProjectPropsInterface {
  readonly whetherCreateProject: boolean;
  readonly handleWhetherCreateProjectDialog: (val: boolean) => void;
  readonly handleAddProjectList: (targetTask: ProjectInterface) => void;
}

export interface UserWebGetMemberMapMessage {
  type: string;
  userIDs: Array<string>;
}

const originalFakeSelectMemberMap: { [key: string]: boolean } = {};
fakeMembers.map(
  (fakeMember) => (originalFakeSelectMemberMap[fakeMember] = false)
);

export const CreateProjectDialog = (props: CreateProjectPropsInterface) => {
  const [initial, setInitial] = useState(1);
  const userContext = useContext(UserContext);
  // 这里需要加上当前用户的id
  const [projectForm, setProjectForm] = useState<ProjectInterface>({
    projectID: '',
    projectName: '',
    createUserID: '',
    createUserName: '',
    description: '',
    startDate: new Date(),
    selectMemberIDs: {},
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const userBasicInfo: UserBasicInfo = JSON.parse(
      window.localStorage.getItem('userBasicInfo') || '{}'
    );
    const userID: string = window.localStorage.getItem('userID') || '';
    var userIDs: Array<string> = [];
    console.log('friendList:', userBasicInfo.friendIDList);
    Object.assign(userIDs, userBasicInfo.friendIDList);
    userIDs.push(userID);
    const userWebGetMemberMapMessage: UserWebGetMemberMapMessage = {
      type: 'UserWebGetMemberMapMessage',
      userIDs: userIDs,
    };
    var selectMemberIDs: { [key: string]: boolean } = {};
    userIDs.forEach((userID) => {
      selectMemberIDs[userID] = false;
    });
    const getMemberMapPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetMemberMapMessage)
      );
    console.log(JSON.stringify(userWebGetMemberMapMessage));
    axios.all([getMemberMapPromise()]).then(
      axios.spread((memberMapRst) => {
        console.log(memberMapRst);

        setProjectForm({
          ...projectForm,
          ['createUserID']: userID,
          ['memberMap']: memberMapRst.data.memberMap,
          ['selectMemberIDs']: selectMemberIDs,
        });
      })
    );
  }, [initial == 1]);

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectForm({
      ...projectForm,
      ['projectName']: event.currentTarget.value,
    });
  };

  const [whetherOpenSelectedMembers, setWhetherOpenSelectedMembers] = useState<
    boolean
  >(false);

  const [whetherSelectMember, setWhetherSelectMember] = useState<boolean>(
    false
  );

  const handleWhetherSelectMember = (val: boolean) => {
    setWhetherSelectMember(val);
  };

  const handleCheckMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.name);
    console.log(projectForm.selectMemberIDs);
    console.log({
      ...projectForm['selectMemberIDs'],
      [e.currentTarget.id]: e.currentTarget.checked,
    });
    setProjectForm({
      ...projectForm,
      ['selectMemberIDs']: {
        ...projectForm['selectMemberIDs'],
        [e.currentTarget.id]: e.currentTarget.checked,
      },
    });
  };

  const handleCancelCheckMemberClick = () => {
    var newMembers: { [key: string]: boolean } = {};
    Object.entries(projectForm['selectMemberIDs']).map(
      (member: [string, boolean]) => {
        newMembers[member[0]] = false;
      }
    );
    setProjectForm({
      ...projectForm,
      ['selectMemberIDs']: newMembers,
    });
  };

  const handleProjectDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectForm({
      ...projectForm,
      ['description']: event.currentTarget.value,
    });
  };

  const handleConfirmClick = () => {
    const unchangedProjectForm = Object.assign({}, projectForm);
    var recoverMembers: { [key: string]: boolean } = {};
    Object.entries(projectForm.selectMemberIDs).map(
      (member: [string, boolean]) => {
        recoverMembers[member[0]] = false;
      }
    );
    setProjectForm({
      ...projectForm,
      ['selectMemberIDs']: recoverMembers,
    });
    props.handleAddProjectList(unchangedProjectForm);
    props.handleWhetherCreateProjectDialog(false);
  };

  const handleCancelClick = () => {
    props.handleWhetherCreateProjectDialog(false);
  };

  return (
    <Dialog
      open={props.whetherCreateProject}
      scroll="paper"
      // style={{ marginTop: '65px', height: '500px' }}
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
              创建项目
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              style={{ right: 0 }}
              onClick={() => props.handleWhetherCreateProjectDialog(false)}
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
                {/* TODO 这里需要添加该用户的名称 */}
                <Input
                  id="leader"
                  disabled={true}
                  value={userContext.userName}
                  style={{ width: '300px' }}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl>
                <InputLabel htmlFor="projectName">项目名称</InputLabel>
                <Input
                  id="projectName"
                  aria-describedby="my-helper-text"
                  style={{ width: '300px' }}
                  onChange={handleProjectNameChange}
                />
                {/* <FormHelperText id="my-helper-text">
                            We'll never share your email.
                          </FormHelperText> */}
              </FormControl>
            </ListItem>
            <ListItem>
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
                memberIDSelectMap={projectForm.selectMemberIDs}
                handleCancelClick={handleCancelCheckMemberClick}
              ></SelectMemberDialog>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="已选取组员:"
                secondary={
                  <AvatarGroup max={4}>
                    {Object.entries(projectForm.selectMemberIDs)
                      .filter(
                        (memberID: [string, boolean], value) => memberID[1]
                      )
                      .map((memberID: [string, boolean]) => (
                        <Avatar alt={projectForm.memberMap?.[memberID[0]]}>
                          {projectForm.memberMap?.[memberID[0]].slice(0, 1)}
                        </Avatar>
                      ))}
                  </AvatarGroup>
                }
                style={{ fontSize: '14px' }}
                primaryTypographyProps={{ variant: 'inherit' }}
              ></ListItemText>
            </ListItem>
            <ListItem id="project-description-list-item">
              <FormControl>
                <InputLabel htmlFor="projectDescription">任务描述</InputLabel>
                <Input
                  id="projectDescription"
                  onChange={handleProjectDescriptionChange}
                  style={{ width: '300px' }}
                ></Input>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                size="medium"
                variant="outlined"
                color="primary"
                onClick={handleConfirmClick}
              >
                创建
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                style={{ color: '#9c2712', left: 0 }}
                onClick={handleCancelClick}
              >
                取消
              </Button>
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      {/* <Grid container justify="center">
        <Card
          style={{
            marginTop: '260p',
            width: '350px',
            height: '400px',
            position: 'fixed',
            zIndex: 12,
          }}
        >
          <CardContent>
            <Grid container direction="row" justify="space-evenly">
              <Grid item>
                <Grid container direction="column" spacing={2} justify="center">
                  <Grid item>
                  </Grid>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel htmlFor="projectDescription">
                        描述项目
                      </InputLabel>
                      <Input
                        id="projectDescription"
                        aria-describedby="my-helper-text"
                        style={{ width: '250px' }}
                        onChange={(event) => {
                          setDescription(event.currentTarget.value);
                        }}
                      />
                      {/* <FormHelperText id="my-helper-text">
                            We'll never share your email.
                          </FormHelperText> */}
      {/* </FormControl>
                  </Grid>
                  <Grid item>
                    <List>
                      <ListItem>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
    </Dialog>
  );
};
