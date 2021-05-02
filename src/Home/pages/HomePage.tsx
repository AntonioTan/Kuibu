/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 23:57:26
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-02 21:39:23
 */

import {
  Collapse,
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import ChatPanel from '../../Chat/ChatPanel';
import { MemberPanel } from '../../Members/MemberPanel';
import { TasksPanel } from '../../Tasks/TasksPanel';
import { KuibuAppBar } from '../../utils/components/KuibuAppBar';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import { sessionData } from '../../utils/mock';
import { UserContext } from '../../utils/components/UserContext';
import { serverAddress } from '../../utils/globals';
import axios from 'axios';
import { ProjectCard } from '../../Projects/components/dist/ProjectCard';
import { UserWebGetCompleteProjectInfoMessage } from '../Messages/UserWebGetCompleteProjectInfoMessage';


export interface ProjectCompleteInfoInterface {
  projectID: string;
  projectName: string;
  createUserID: string;
  createUserName: string;
  startDate: Date;
  description: string;
  userMap: { [key: string]: string };
  taskMap: { [key: string]: string };
  sessionMap: { [key: string]: string };
}

export interface WebReplyProjectCompleteInfoInterface {
  projectID: string;
  projectName: string;
  createUserID: string;
  createUserName: string;
  startDate: string;
  description: string;
  userMap: { [key: string]: string };
  taskMap: { [key: string]: string };
  sessionMap: { [key: string]: string };
}

function functionTabProps(index: any) {
  return {
    value: index,
    key: index,
    id: `vertical-function-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    style: { backgroundColor: '#12879c', color: '#d7ebed' },
  };
}

function sessionTabProps(index: number) {
  return {
    value: index,
    key: index,
    style: { backgroundColor: '#12879c', color: '#d7ebed' },
  };
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

const Accordion = withStyles({
  root: {
    // border: '1px solid #76a8b7',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#67a9b9',
    minHeight: 40,
    color: '#d7ebed',
    '&$expanded': {
      minHeight: 40,
    },
  },
  content: {
    flexGrow: 1,
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {
    backgroundColor: '#12879c',
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: '#8abdc9',
  },
}))(MuiAccordionDetails);
const ws = new WebSocket('ws:127.0.0.1:8080/ws?userID=003');
const ws2 = new WebSocket('ws:127.0.0.1:8080/ws?userID=004');
ws.onopen = (e) => {
  console.log(e);
};
ws.onmessage = (res) => {
  console.log(res);
};
ws.onclose = (e) => {
  const entity = "{'type': 'UserWsCloseMessage', 'userID': '003'}";
};

ws2.onopen = (e) => {
  const entity = {
    type: 'UserWsInviteProjectMessage',
    senderID: '003',
    inviteUserID: '004',
    projectID: '001',
    projectName: 'Hello World',
  };
  console.log(JSON.stringify(entity));
  ws.send(JSON.stringify(entity));
};
ws2.onmessage = (e) => {
  console.log(e);
};

export const HomePage = () => {
  const userContext = React.useContext(UserContext);
  const [functionID, setFunctionID] = React.useState('vertical-function-tab-0');
  const [initial, setInitial] = React.useState<number>(1);
  const [
    currentProject,
    setCurrentProject,
  ] = React.useState<ProjectCompleteInfoInterface | null>();
  React.useEffect(() => {
    const currentProjectID: string =
      window.localStorage.getItem('currentProjectID') || '';
    const userWebGetCompleteProjectInfoMessage: UserWebGetCompleteProjectInfoMessage = {
      type: 'UserWebGetCompleteProjectInfoMessage',
      projectID: currentProjectID,
    };
    const getCompleteProjectInfoPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetCompleteProjectInfoMessage)
      );

    axios.all([getCompleteProjectInfoPromise()]).then(
      axios.spread((getCompleteProjectInfoRst) => {
        const webReplyCompleteProjectInfo: WebReplyProjectCompleteInfoInterface =
          getCompleteProjectInfoRst.data.projectCompleteInfo;
        console.log(
          'webReplyCompleteProjectMessage',
          webReplyCompleteProjectInfo
        );
        const projectCompleteInfo: ProjectCompleteInfoInterface = {
          projectID: webReplyCompleteProjectInfo.projectID,
          projectName: webReplyCompleteProjectInfo.projectName,
          createUserID: webReplyCompleteProjectInfo.createUserID,
          createUserName: webReplyCompleteProjectInfo.createUserName,
          description: webReplyCompleteProjectInfo.description,
          startDate: new Date(webReplyCompleteProjectInfo.startDate),
          userMap: webReplyCompleteProjectInfo.userMap,
          sessionMap: webReplyCompleteProjectInfo.sessionMap,
          taskMap: webReplyCompleteProjectInfo.taskMap,
        };
        setCurrentProject(projectCompleteInfo);
        setInitial(0);
      })
    );
  }, [initial]);
  const [functionTabValue, setFunctionTabValue] = React.useState<
    number | boolean
  >(0);
  const [sessionTabValue, setSessionTabValue] = React.useState(0);
  const [discussionTabExpanded, setDiscussionTabExpanded] = React.useState(
    false
  );
  const handleFunctionTabChange = (event: any, newValue: number) => {
    setFunctionID(event.currentTarget.id);
    if (typeof newValue === typeof 1) {
      setDiscussionTabExpanded(false);
      setFunctionTabValue(newValue);
    } else {
      setFunctionTabValue(false);
      setDiscussionTabExpanded(!discussionTabExpanded);
    }
  };
  const handleSessionTabChange = (event: any, newValue: number) => {
    setSessionTabValue(newValue);
  };

  const discussionTab = (
    <Accordion expanded={discussionTabExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#d7ebed' }} />}
        aria-controls="panel2a-content"
        id="vertical-function-tab-1"
      >
        <Typography
          variant="inherit"
          style={{
            marginLeft: '35px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          我的讨论
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Tabs
          orientation="vertical"
          value={sessionTabValue}
          variant="fullWidth"
          onChange={handleSessionTabChange}
          aria-label="Vertical tabs sessions"
          style={{ width: '150px' }}
        >
          {Object.entries(currentProject?.sessionMap||{}).map((session: [string, string], index: number) => {
            return <Tab id={session[0]} label={session[1]} {...sessionTabProps(index)} />;
          })}
        </Tabs>
      </AccordionDetails>
    </Accordion>
  );
  const getFunction = (id: String) => {
    var createUserMap: { [key: string]: string } = {};
    const createUserID: string = currentProject?.createUserID || '';
    if (createUserID != '') {
      createUserMap[createUserID] = currentProject?.createUserName || '';
    }

    const allMemberMap: { [key: string]: string } = Object.assign(
      {},
      currentProject?.userMap,
      createUserMap
    );
    if (id === 'vertical-function-tab-0') {
      console.log('all member map', allMemberMap);
      return (
        <TasksPanel
          taskMap={currentProject?.taskMap}
          allMemberMap={allMemberMap}
        ></TasksPanel>
      );
    } else if (id === 'vertical-function-tab-1') {
      return <ChatPanel></ChatPanel>;
    } else if (id === 'vertical-function-tab-3') {
      return <MemberPanel></MemberPanel>;
    } else {
      return <div></div>;
    }
    return;
  };
  return (
    <div>
      <CssBaseline>
        <Grid
          container
          direction="column"
          // alignItems="flex-start"
        >
          {/* <Grid item> */}
          <KuibuAppBar></KuibuAppBar>
          {/* </Grid> */}
          <Grid item>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ width: '1000px', height: '600px' }}
            >
              <Grid item>
                <Grid container direction="row" alignItems="flex-start">
                  <Grid
                    item
                    style={{
                      marginTop: '63px',
                      width: '150px',
                      position: 'fixed',
                    }}
                  >
                    <div>
                      <Tabs
                        orientation="vertical"
                        value={functionTabValue}
                        variant="fullWidth"
                        onChange={handleFunctionTabChange}
                        aria-label="Vertical tabs functionality"
                        // className={classes.tabs}
                      >
                        <Tab label="任务列表" {...functionTabProps(0)} />
                        {discussionTab}
                        <Tab label="我的任务" {...functionTabProps(2)} />
                        <Tab label="小组成员" {...functionTabProps(3)} />
                        <Tab label="日程安排" {...functionTabProps(4)} />
                        <Tab label="项目甘特图" {...functionTabProps(5)} />
                        <Tab label="总体进度" {...functionTabProps(6)} />
                      </Tabs>
                    </div>
                  </Grid>
                  <Grid item>
                    <div
                      style={{
                        width: '2px',
                        height: '675px',
                        marginTop: '70px',
                        marginLeft: '150px',
                        backgroundColor: '#d7ebed',
                        position: 'fixed',
                      }}
                    ></div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: '180px', marginTop: '70px' }}>
                {getFunction(functionID)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
