/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 23:57:26
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 15:14:25
 */

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { KuibuAppBar } from '../../utils/components/KuibuAppBar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    style: { backgroundColor: '#12879c', color: '#d7ebed' },
  };
}

function avatarProps(index: any) {
  return {};
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatarSmall: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '20px',
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
    // event.currentTarget.style.backgroundColor = '#0f7385';
  };
  return (
    <div>
      <CssBaseline>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <KuibuAppBar></KuibuAppBar>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item style={{ marginTop: '63px' }}>
              <Grid container direction="row" alignItems="flex-start">
                <Grid item>
                  <div>
                    <Tabs
                      orientation="vertical"
                      variant="fullWidth"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      // className={classes.tabs}
                    >
                      <Tab label="项目" {...a11yProps(0)} />
                      <Tab label="讨论" {...a11yProps(1)} />
                      <Tab label="" {...a11yProps(2)} />
                      <Tab label="Item Four" {...a11yProps(3)} />
                      <Tab label="Item Five" {...a11yProps(4)} />
                      <Tab label="Item Six" {...a11yProps(5)} />
                      <Tab label="Item Seven" {...a11yProps(6)} />
                    </Tabs>
                  </div>
                </Grid>
                <Grid item>
                  <div
                    style={{
                      width: '2px',
                      height: '675px',
                      backgroundColor: '#d7ebed',
                      position: 'fixed',
                    }}
                  ></div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: '70px' }} zeroMinWidth>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item style={{ width: '400px' }}>
                  <Card>
                    <Button>
                      <CardHeader
                        avatar={<Avatar aria-label="recipe">R</Avatar>}
                        title="Shrimp and Chorizo Paella"
                        subheader="Created on September 14, 2016"
                        style={{ textAlign: 'left' }}
                      />
                    </Button>
                  </Card>
                  <Card>
                    <CardHeader
                      avatar={<Avatar aria-label="test-project">任</Avatar>}
                      title="任务管理开发任务"
                      subheader="创建于2020年2月22日"
                      style={{ textAlign: 'left' }}
                      action={
                        <IconButton aria-label="close">
                          <CloseIcon />
                        </IconButton>
                      }
                    ></CardHeader>
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item>
                              <div style={{ display: 'flex' }}>
                                <AvatarGroup max={4}>
                                  <Avatar
                                    style={{ backgroundColor: 'orange' }}
                                    className={classes.avatarSmall}
                                  >
                                    T
                                  </Avatar>
                                  <Avatar
                                    style={{ backgroundColor: 'green' }}
                                    className={classes.avatarSmall}
                                  >
                                    H
                                  </Avatar>
                                  <Avatar
                                    style={{ backgroundColor: 'blue' }}
                                    className={classes.avatarSmall}
                                  >
                                    E
                                  </Avatar>
                                </AvatarGroup>
                              </div>
                            </Grid>
                            <Grid item>
                              <Typography style={{ display: 'flex' }}>
                                创建人：谭天一
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Divider variant="middle" />
                        </Grid>
                        <Grid item>
                          <Typography>
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                            该项目是一个测试项目用于开发任务管理信息系统，欢迎各位使用。
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">R</Avatar>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
