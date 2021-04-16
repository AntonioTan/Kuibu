/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-06 15:56:24
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-13 01:06:47
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
import React, { useState } from 'react';
import { KuibuAppBar } from '../utils/components/KuibuAppBar';
import { ProjectCard } from './components/ProjectCard';
import SearchBar from 'material-ui-search-bar';
import AddBox from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { CreateProjectPanel } from './components/CreateProjectPanel';

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
export const ProjectsPage = () => {
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

  const handleCreateProject = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    projectName: string,
    projectDescription: string
  ) => {
    setProjectNames([...projectNames, projectName]);
    setProjectDescriptions([...projectDescriptions, projectDescription]);
  };

  return (
    <div>
      <CssBaseline>
        <Grid container direction="column">
          <KuibuAppBar></KuibuAppBar>
          <Grid item>
            <Grid
              container
              direction="row"
              style={{ marginTop: '65px', width: '1000px', height: '650px' }}
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

              <Grid item>
                {whetherCreateProject ? (
                  <CreateProjectPanel
                    handleCloseCreateProjectClick={handleCloseProjectPanel}
                    handleCreateProject={handleCreateProject}
                  ></CreateProjectPanel>
                ) : (
                  <div></div>
                )}
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    spacing={2}
                  >
                    {projectNames.map((name, index) => (
                      <Grid item style={{ width: '400px' }}>
                        <ProjectCard
                          name={name}
                          index={index}
                          description={projectDescriptions[index]}
                        ></ProjectCard>
                      </Grid>
                    ))}
                    {projectNames.length % 2 == 1 ? (
                      <Grid item style={{ width: '400px' }}></Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
