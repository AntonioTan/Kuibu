/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-05 23:57:26
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-08 22:04:25
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
import GanttPanel from '../../Gantt/GanttPanel';
import { GanttTest } from '../../Gantt/GanttTest';
import CalendarPanel from '../../Calendar/CalendarPanel';
import { UserWebWSInitializeMessage } from '../Messages/UserWsInitializeMessage';
import { WebReplyWSInitializeMessage } from '../Messages/WebReplyWSInitializeMessage';
import { PrintOutlined } from '@material-ui/icons';
import { SyncEditPanel } from '../../SyncEdit/SyncEditPanel';


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
    style: { backgroundColor: '#12879c', color: '#d7ebed', fontSize: '13px'},

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
var ws = new WebSocket('ws:127.0.0.1:8080/ws?userID=003');
ws.onopen = (e) => {
  console.log(e);
};
ws.onmessage = (res) => {
  console.log("aaaaaa", res);
};
ws.onclose = (e) => {
  const entity = "{'type': 'UserWsCloseMessage', 'userID': '003'}";
};


export const HomePage = () => {
  const userContext = React.useContext(UserContext);
  const [initial, setInitial] = React.useState<number>(1);
  const [functionPanel, setFunctionPanel] = React.useState<JSX.Element>(<div></div>);
  const [myWS, setMyWS] = React.useState<WebSocket>(ws);
  const [
    currentProject,
    setCurrentProject,
  ] = React.useState<ProjectCompleteInfoInterface | null>();
  const [currentSessionID, setCurrentSessionID] = React.useState<string>("");
  React.useEffect(() => {
    const userID: string = window.localStorage.getItem("userID")||""
    const currentProjectID: string =
      window.localStorage.getItem('currentProjectID') || '';
    const userWsInitializeMessage: UserWebWSInitializeMessage = {
        type: "UserWebWSInitializeMessage",
        projectID: currentProjectID,
        userID: userID,
    }
    const userWebGetCompleteProjectInfoMessage: UserWebGetCompleteProjectInfoMessage = {
      type: 'UserWebGetCompleteProjectInfoMessage',
      projectID: currentProjectID,
    };
    const getCompleteProjectInfoPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetCompleteProjectInfoMessage)
      );
      const initializeUserWsPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWsInitializeMessage)
      )

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
        if(Object.entries(projectCompleteInfo.sessionMap).length>0) setCurrentSessionID(Object.keys(projectCompleteInfo.sessionMap)[0])
        var createUserMap: { [key: string]: string } = {};
    const createUserID: string = projectCompleteInfo.createUserID || '';
    if (createUserID != '') {
      createUserMap[createUserID] = projectCompleteInfo.createUserName || '';
    }

    const allMemberMap: { [key: string]: string } = Object.assign(
      {},
      currentProject?.userMap,
      createUserMap
    );
      setFunctionPanel(
      <TasksPanel
          taskMap={projectCompleteInfo.taskMap}
          allMemberMap={allMemberMap}
        ></TasksPanel>
      );
        setInitial(0);
      })
    );
    if(userID!="") {
      ws = new WebSocket(`ws:127.0.0.1:8080/ws?userID=${userID}`)
      ws.onopen = ()=> {
        console.log("ws is on!")
        setMyWS(ws);
        axios.all([initializeUserWsPromise()]).then(
          axios.spread(
            (initializeUserWsRst) => {
        // WS initialize
        const webReplyWSInitializeMessage:WebReplyWSInitializeMessage = initializeUserWsRst.data
        console.log("initialize ws result", webReplyWSInitializeMessage.outcome)

            }
          )
        )
      }
    }
  }, [initial]);
  const [functionTabValue, setFunctionTabValue] = React.useState<
    number | boolean
  >(0);
  const [sessionTabValue, setSessionTabValue] = React.useState(0);
  const [discussionTabExpanded, setDiscussionTabExpanded] = React.useState(
    false
  );
  const handleFunctionTabChange = (event: any, newValue: number) => {
    const id = event.currentTarget.id
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
      setFunctionPanel(
      <TasksPanel
          taskMap={currentProject?.taskMap}
          allMemberMap={allMemberMap}
        ></TasksPanel>
      );
    } else if (id === 'vertical-function-tab-1') {
      setFunctionPanel(<ChatPanel sessionID={currentSessionID}></ChatPanel>);
    } else if (id === 'vertical-function-tab-2') {
      setFunctionPanel(<SyncEditPanel></SyncEditPanel>)
    } else if (id === 'vertical-function-tab-3') {
      setFunctionPanel(<MemberPanel></MemberPanel>);
    } else if (id === 'vertical-function-tab-4') {
      setFunctionPanel(<CalendarPanel></CalendarPanel>)
    } else if (id === 'vertical-function-tab-5') {
      setFunctionPanel(<GanttPanel></GanttPanel>)
    }
     else {
      setFunctionPanel(<div></div>);
    }
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

  const handleSessionTabClick = (event: React.MouseEvent<HTMLElement>) => {
    setCurrentSessionID(event.currentTarget.id)
    setFunctionPanel(<ChatPanel sessionID={event.currentTarget.id}></ChatPanel>)
  }

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
          variant="scrollable"
          onChange={handleSessionTabChange}
          aria-label="Vertical tabs sessions"
          style={{ width: '150px' }}
        >
          {Object.entries(currentProject?.sessionMap||{}).map((session: [string, string], index: number) => {
            return <Tab id={session[0]} label={session[1].length>14?session[1].slice(0, 14)+'...':session[1]}
            onClick = {handleSessionTabClick}
            {...sessionTabProps(index)}>
            </Tab>;
          })}
        </Tabs>
      </AccordionDetails>
    </Accordion>
  );
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
                    <div style={{
                      flexGrow: 1,
                      display: 'flex',
                      height: 700,
                      zIndex: 2,
                    }}>
                      <Tabs
                        orientation="vertical"
                        value={functionTabValue}
                        variant="scrollable"
                        onChange={handleFunctionTabChange}
                        aria-label="Vertical tabs functionality"
                        scrollButtons="off"
                        style={{backgroundColor: '#fafafa'}}
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
                {functionPanel}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};
