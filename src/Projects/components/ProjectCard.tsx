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
import React, { useState } from 'react';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { ipcRenderer } from 'electron';
import { ProjectInterface } from './CreateProjectDialog';
import { serverAddress, theme, wsAddress } from '../../utils/globals';
import { UserWebWSInitializeMessage } from '../../Home/Messages/UserWebWSInitializeMessage';
import axios from 'axios';
import { WebReplyWSInitializeMessage } from '../../Home/Messages/WebReplyWSInitializeMessage';

interface ProjectCardInterface {
  project: ProjectInterface;
  index: number;
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

export const ProjectCard = (props: ProjectCardInterface) => {
  const [contentOpen, setContentOpen] = useState(false);
  const classes = useStyles();
  const handleContentOpen = () => {
    setContentOpen(!contentOpen);
  };
  const handleEnterProject = () => {
    const userID: string = window.localStorage.getItem("userID")||""
    const currentProjectID: string = window.localStorage.getItem("currentProjectID") || "";
    if(currentProjectID.length!=0) {
      window.localStorage.setItem("lastProjectID", currentProjectID)
    }
    window.localStorage.setItem('currentProjectID', props.project.projectID);
    ipcRenderer.send('goMain');
    // const ws = new WebSocket(`${wsAddress}/ws?userID=${userID}`)

    // ws.onopen = () => {
    //   if(lastProjectID != props.project.projectID) {
    // const userWsInitializeMessage: UserWebWSInitializeMessage = {
    //     type: "UserWebWSInitializeMessage",
    //     lastProjectID: lastProjectID,
    //     projectID: props.project.projectID,
    //     userID: userID,
    // }
    // const initializeUserWsPromise = () =>
    //   axios.post(
    //     `${serverAddress}/web`,
    //     JSON.stringify(userWsInitializeMessage)
    //   )
    // axios.all([initializeUserWsPromise()]).then(
    //       axios.spread(
    //         (initializeUserWsRst) => {
    //     // WS initialize
    //     const webReplyWSInitializeMessage:WebReplyWSInitializeMessage = initializeUserWsRst.data
    //     console.log("initialize ws result", webReplyWSInitializeMessage.outcome)
    //     ipcRenderer.send('goMain');

    //         }
    //       )
    //     )
    // window.localStorage.setItem('currentProjectID', props.project.projectID);
    // } else {
    // ipcRenderer.send('goMain');
    // }
  // }

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
              {props.project.projectName.substring(0, 1)}
            </Avatar>
          }
          title={props.project.projectName}
          // TODO 需要加上创建日期
          subheader={`${props.project.startDate.toLocaleDateString()}`}
          style={{ textAlign: 'left' }}
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
                      <AvatarGroup
                        max={4}
                        classes={{ avatar: classes.avatarSmall }}
                      >
                        {Object.entries(props.project.selectMemberIDs)
                          .filter((memberID: [string, boolean]) => {
                            return memberID[1];
                          })
                          .map((memberID: [string, boolean]) => {
                            return (
                              <Avatar
                                alt={props.project.memberMap?.[memberID[0]]}
                                className={classes.avatarSmall}
                              >
                                {props.project.memberMap?.[memberID[0]].slice(
                                  0,
                                  1
                                )}
                              </Avatar>
                            );
                          })}
                        {/* <Avatar
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
                        </Avatar> */}
                      </AvatarGroup>
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography style={{ display: 'flex' }}>
                      {/* TODO 这里需要根据createUserID去找到userName */}
                      {`创建人：${props.project.createUserName}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider></Divider>
              <Grid item>
                <Typography>{props.project.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
        <CardActions>
          <Button
            variant="outlined"
            style={{ backgroundColor: '#0f7385', color: '#d7ebed' }}
            onClick={handleEnterProject}
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
