/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-06 15:56:24
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-07 14:22:10
 */
import { CssBaseline, Grid, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { KuibuAppBar } from '../utils/components/KuibuAppBar';
import { ProjectCard } from './components/ProjectCard';
import SearchBar from 'material-ui-search-bar';
import AddBox from '@material-ui/icons/AddBox';

export const ProjectsPage = () => {
  const originalProjects = [
    '任务管理系统开发',
    '篮球比赛训练',
    '美的集团小组分析',
    '任务分配小队',
  ];
  const [projects, setProjects] = useState(originalProjects);

  const [searched, setSearched] = useState<string>('');
  const requestSearch = (searchedVal: string) => {
    const filteredProjects = originalProjects.filter((project) => {
      return project.indexOf(searchedVal) != -1;
    });
    setProjects(filteredProjects);
  };
  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };
  return (
    <div>
      <CssBaseline>
        <KuibuAppBar></KuibuAppBar>
        <Grid
          container
          direction="column"
          style={{ marginTop: '65px' }}
          spacing={2}
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
                ></SearchBar>
              </Grid>
              <Grid item>
                <IconButton aria-label="addProject" color="primary">
                  <AddBox fontSize="large"></AddBox>{' '}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} justify="space-evenly">
              {projects.map((name, index) => (
                <Grid item style={{ width: '400px' }}>
                  <ProjectCard name={name} index={index}></ProjectCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
