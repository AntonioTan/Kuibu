/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 00:12:37
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 13:49:55
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
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Flipped } from 'react-flip-toolkit';
import { SelectMemberDialog } from '../../Tasks/components/SelectMemberDialog';
import GroupIcon from '@material-ui/icons/Group';
import { fakeMembers } from '../../utils/mock';
import { AvatarGroup } from '@material-ui/lab';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

export interface ProjectInterface {
  projectID: string;
  projectName: string;
  createUserName: string;
  description: string;
  startDate: Date;
  selectMemberIDs: { [key: string]: boolean };
  memberMap: { [key: string]: string };
}

interface CreateProjectPropsInterface {
  readonly whetherCreateProject: boolean;
  readonly handleWhetherCreateProjectDialog: (val: boolean) => void;
  readonly handleAddProjectList: (targetTask: ProjectInterface) => void;
}

const originalFakeSelectMemberMap: { [key: string]: boolean } = {};
fakeMembers.map(
  (fakeMember) => (originalFakeSelectMemberMap[fakeMember] = false)
);

export const CreateProjectDialog = (props: CreateProjectPropsInterface) => {
  // 这里需要加上当前用户的id
  const [projectForm, setProjectForm] = useState<ProjectInterface>({
    projectID: '',
    projectName: '',
    createUserName: '',
    description: '',
    startDate: new Date(),
    selectMemberIDs: originalFakeSelectMemberMap,
    memberMap: {},
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
    setProjectForm({
      ...projectForm,
      ['selectMemberIDs']: {
        ...projectForm['selectMemberIDs'],
        [e.currentTarget.name]: e.currentTarget.checked,
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
                  value="谭天一"
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
                members={projectForm.selectMemberIDs}
                handleCancelClick={handleCancelCheckMemberClick}
              ></SelectMemberDialog>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="已选取组员:"
                secondary={
                  <AvatarGroup max={4}>
                    {Object.entries(projectForm.selectMemberIDs)
                      .filter((member: [string, boolean], value) => member[1])
                      .map((member: [string, boolean]) => (
                        <Avatar alt={member[0]}>{member[0].slice(0, 1)}</Avatar>
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
