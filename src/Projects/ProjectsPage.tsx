/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-06 15:56:24
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-20 16:26:04
 */
import {
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { KuibuAppBar } from '../utils/components/KuibuAppBar';
import { ProjectCard } from './components/ProjectCard';
import SearchBar from 'material-ui-search-bar';
import AddBox from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';
import { Flipper, Flipped } from 'react-flip-toolkit';
import {
  CreateProjectDialog,
  ProjectInterface,
} from './components/CreateProjectDialog';
import { myUserID, serverAddress } from '../utils/globals';
import UserContextProviderComponent, {
  UserContext,
  UserContextInterface,
} from '../utils/components/UserContext';
import axios from 'axios';
import {
  UserBasicInfo,
  UserWebBasicUserInfoMessage,
  WebReplyBasicUserInfoMessage,
} from '../Login/views/LoginPanel';

export interface UserWebBasicProjectsInfoMessage {
  type: string;
  projectID: string;
}

interface ProjectBasicInfoInterface {
  projectID: string;
  projectName: string;
  createUserName: string;
  description: string;
  startDate: string;
  userMap: { [key: string]: string };
}

export interface UserWebAddProjectMessage {
  type: string;
  projectName: string;
  createUserID: string;
  description: string;
  userIDList: Array<string>;
}

export interface WebReplyAddProjectMessage {
  type: string;
  projectID: string;
}

// const ws = new WebSocket(`ws:127.0.0.1:8080/ws?userID=${myUserID}`);

export const ProjectsPage = () => {
  const userID: string = window.localStorage.getItem('userID') || '';
  const [initial, setInitial] = useState(1);
  const userContext = useContext<UserContextInterface>(UserContext);
  const [searchedProjects, setSearchedProjects] = useState<
    Array<ProjectInterface>
  >([]);
  const [projectList, setProjectList] = useState<Array<
    ProjectInterface
  > | null>();
  useEffect(() => {
    const userWebBasicUserInfoMessage: UserWebBasicUserInfoMessage = {
      type: 'UserWebBasicUserInfoMessage',
      userID: userID,
    };
    var userBasicInfo: UserBasicInfo = {
      userName: '',
      sessionIDList: [],
      friendIDList: [],
      projectIDList: [],
    };
    console.log(userWebBasicUserInfoMessage);
    setInitial(0);
    Promise.resolve(
      axios
        .post(
          `${serverAddress}/web`,
          JSON.stringify(userWebBasicUserInfoMessage)
        )
        .then((res) => {
          const webReplyBasicUserInfoMessage: WebReplyBasicUserInfoMessage =
            res.data;
          console.log(res.data);
          userBasicInfo = webReplyBasicUserInfoMessage.userBasicInfo;
          userContext.updateStringField('userID', userID);
          userContext.updateStringField(
            'userName',
            webReplyBasicUserInfoMessage.userBasicInfo.userName
          );
          userContext.updateListField(
            'sessionIDList',
            webReplyBasicUserInfoMessage.userBasicInfo.sessionIDList
          );
          userContext.updateListField(
            'friendIDList',
            webReplyBasicUserInfoMessage.userBasicInfo.friendIDList
          );
          userContext.updateListField(
            'projectIDList',
            webReplyBasicUserInfoMessage.userBasicInfo.projectIDList
          );
          window.localStorage.setItem('userID', userID);
          window.localStorage.setItem(
            'userBasicInfo',
            JSON.stringify(webReplyBasicUserInfoMessage.userBasicInfo)
          );
        })
    ).then(() => {
      console.log('after', userContext.projectIDList);
      var newProjectList: Array<ProjectInterface> = [];
      axios
        .all(
          userBasicInfo.projectIDList.map((projectID) => {
            const userWebBasicProjectsInfoMessage: UserWebBasicProjectsInfoMessage = {
              type: 'UserWebBasicProjectInfoMessage',
              projectID: projectID,
            };
            return axios.post(
              `${serverAddress}/web`,
              JSON.stringify(userWebBasicProjectsInfoMessage)
            );
          })
        )
        .then((results) => {
          results.map((res) => {
            const projectBasicInfo: ProjectBasicInfoInterface =
              res.data.projectBasicInfo;
            const selectMemberIDs: { [key: string]: boolean } = {};
            Object.entries(projectBasicInfo.userMap).map(
              (user: [string, string]) => {
                selectMemberIDs[user[0]] = true;
              }
            );
            console.log(projectBasicInfo.startDate);
            const newProject: ProjectInterface = {
              projectID: projectBasicInfo.projectID,
              projectName: projectBasicInfo.projectName,
              createUserID: projectBasicInfo.projectID,
              createUserName: projectBasicInfo.createUserName,
              description: projectBasicInfo.description,
              startDate: new Date(projectBasicInfo.startDate),
              selectMemberIDs: selectMemberIDs,
              memberMap: projectBasicInfo.userMap,
            };
            newProjectList = [...newProjectList, newProject];
            setProjectList(newProjectList);
            setSearchedProjects(newProjectList);
          });
        });
    });
    // console.log('tty', newProjectList);
    // setProjectList(newProjectList);
  }, [initial == 1]);

  const [whetherCreateProject, setWhetherCreateProject] = useState(false);
  const [searched, setSearched] = useState<string>('');
  const requestSearch = (searchedVal: string) => {
    var filteredProjects: Array<ProjectInterface> =
      projectList?.filter((project) => {
        return project.projectName.indexOf(searchedVal) != -1;
      }) || [];
    setSearchedProjects(filteredProjects);
  };
  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const handleCloseProjectPanel = () => {
    setWhetherCreateProject(false);
  };

  const handleOpenProjectPanel = () => {
    setWhetherCreateProject(true);
  };

  const handleAddProjectList = (newProject: ProjectInterface) => {
    const oldProjectList: ProjectInterface[] = projectList || [];
    const userIDList: Array<string> = Object.entries(newProject.selectMemberIDs)
      .filter((member: [string, boolean]) => {
        return member[1];
      })
      .map((member: [string, boolean]) => {
        return member[0];
      });
    const userWebAddProjectMessage: UserWebAddProjectMessage = {
      type: 'UserWebAddProjectMessage',
      projectName: newProject.projectName,
      createUserID: newProject.createUserID,
      description: newProject.description,
      userIDList: userIDList,
    };
    axios
      .post(`${serverAddress}/web`, JSON.stringify(userWebAddProjectMessage))
      .then((res) => {
        const webReplyAddProjectMessage: WebReplyAddProjectMessage = res.data;
        newProject = {
          ...newProject,
          ['projectID']: webReplyAddProjectMessage.projectID,
        };
      });
    setProjectList([...oldProjectList, newProject]);
    setSearchedProjects([...oldProjectList, newProject]);
  };

  const handleWhetherCreateProjectDialog = (val: boolean) => {
    setWhetherCreateProject(val);
  };

  return (
    <div>
      <CssBaseline>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="flex-start"
          spacing={1}
        >
          <KuibuAppBar></KuibuAppBar>
          <Grid item>
            <Grid
              container
              direction="row"
              style={{ marginTop: '65px', width: '1000px' }}
              spacing={2}
              justify="center"
              // alignItems="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <SearchBar
                      value={searched}
                      onChange={(searchVal) => requestSearch(searchVal)}
                      onCancelSearch={() => cancelSearch()}
                      disabled={whetherCreateProject}
                    ></SearchBar>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="addProject"
                      color="primary"
                      onClick={handleOpenProjectPanel}
                    >
                      <AddBox fontSize="large"></AddBox>{' '}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="space-evenly" spacing={2}>
              {searchedProjects?.map((project, index) => {
                return (
                  <Grid item style={{ width: '400px' }}>
                    <ProjectCard project={project} index={index}></ProjectCard>
                  </Grid>
                );
              })}
              <CreateProjectDialog
                whetherCreateProject={whetherCreateProject}
                handleWhetherCreateProjectDialog={
                  handleWhetherCreateProjectDialog
                }
                handleAddProjectList={handleAddProjectList}
              ></CreateProjectDialog>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
