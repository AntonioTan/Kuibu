import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteIcon from '@material-ui/icons/Delete';

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
    card: {
      width: '400px',
      height: '300px',
    },
  })
);

const colorList = [
  'darkcyan',
  'darkgoldenrod',
  'darkblue',
  'darkgreen',
  'darkorange',
  'darkorchid',
  'darksalmon',
  'darkseagreen',
];

const getBackgroundColor = (index: number) =>
  colorList
    .slice(index % colorList.length, (index % colorList.length) + 1)
    .pop();

export const ProjectCard = (props: any) => {
  const [contentOpen, setContentOpen] = useState(false);
  const classes = useStyles();
  const handleContentOpen = () => {
    setContentOpen(!contentOpen);
  };
  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="test-project"
              style={{
                backgroundColor: getBackgroundColor(props.index),
              }}
            >
              {props.name.substring(0, 1)}
            </Avatar>
          }
          title={props.name}
          subheader="创建于2020年2月22日"
          style={{ textAlign: 'left' }}
          action={
            <IconButton aria-label="close">
              <CloseIcon />
            </IconButton>
          }
        ></CardHeader>
        <Collapse in={contentOpen}>
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
        </Collapse>
        <CardActions>
          <Button
            variant="outlined"
            style={{ backgroundColor: '#0f7385', color: '#d7ebed' }}
          >
            进入
          </Button>
          <Button
            style={{ backgroundColor: '#9c2712', color: 'white' }}
            variant="contained"
            startIcon={<DeleteIcon></DeleteIcon>}
          >
            删除
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: 'auto' }}
            onClick={handleContentOpen}
          >
            查看更多
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};