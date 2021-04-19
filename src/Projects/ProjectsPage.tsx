/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-06 15:56:24
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 17:08:48
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
import { UserContext } from '../utils/components/UserContext';
import axios from 'axios';

interface UserWebBasicProjectsInfoMessage {
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

var originalProjectNames: string[] = [
  '任务管理系统开发',
  '篮球比赛训练',
  '美的集团小组分析',
  '任务分配小队',
  '任务管理系统开发',
  '篮球比赛训练',
  '美的集团小组分析',
  '任务分配小队',
  '任务管理系统开发',
  '篮球比赛训练',
  '美的集团小组分析',
  '任务分配小队',
];
var originalProjectDescriptions: string[] = [];
for (const i of originalProjectNames) {
  originalProjectDescriptions.push(
    '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统' +
      '该项目是一个任务管理信息系统'
  );
}

// const ws = new WebSocket(`ws:127.0.0.1:8080/ws?userID=${myUserID}`);

export const ProjectsPage = () => {
  const userContext = useContext(UserContext);
  const [projectList, setProjectList] = useState<Array<ProjectInterface>>([]);
  console.log(projectList);
  useEffect(() => {
    var newProjectList: Array<ProjectInterface> = [];
    axios
      .all(
        userContext.projectIDList.map((projectID) => {
          console.log(projectID);
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
              selectMemberIDs[user[0]] = false;
            }
          );
          console.log(projectBasicInfo.startDate);
          const newProject: ProjectInterface = {
            projectID: projectBasicInfo.projectID,
            projectName: projectBasicInfo.projectName,
            createUserName: projectBasicInfo.createUserName,
            description: projectBasicInfo.description,
            startDate: new Date(projectBasicInfo.startDate),
            selectMemberIDs: selectMemberIDs,
            memberMap: projectBasicInfo.userMap,
          };
          newProjectList = [...newProjectList, newProject];
          setProjectList(newProjectList);
        });
      });
    // console.log('tty', newProjectList);
    // setProjectList(newProjectList);
  }, []);

  const [projectNames, setProjectNames] = useState(originalProjectNames);
  const [projectDescriptions, setProjectDescriptions] = useState(
    originalProjectDescriptions
  );
  const [whetherCreateProject, setWhetherCreateProject] = useState(false);
  const [searched, setSearched] = useState<string>('');
  const requestSearch = (searchedVal: string) => {
    const filteredProjectsNames = originalProjectNames.filter((project) => {
      return project.indexOf(searchedVal) != -1;
    });
    setProjectNames(filteredProjectsNames);
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
    setProjectList([...projectList, newProject]);
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
              {projectList.length > 0 ? (
                projectList.map((project, index) => {
                  return (
                    <Grid item style={{ width: '400px' }}>
                      <ProjectCard
                        project={project}
                        index={index}
                      ></ProjectCard>
                    </Grid>
                  );
                })
              ) : (
                <div></div>
              )}
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
