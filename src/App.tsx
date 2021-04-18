/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-17 23:51:56
 */
import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
// import icon from '../assets/icon.svg';
// import './App.global.css';
import 'antd/dist/antd.css';
// import {Button} from '';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Home from './Home/index';
import { LoginPage } from './Login/LoginPage';
import { HomePage } from './Home/pages/HomePage';
import { ProjectsPage } from './Projects/ProjectsPage';
import UserContextProviderComponent from './utils/components/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
      <ul>
        <li>
          <Link to="/home">Home Page</Link>
        </li>
      </ul>
    </div>
    // <div>
    //   <div className="Hello">
    //     <img width="200px" alt="icon" src={icon} />
    //   </div>
    //   <h1>electron-react-boilerplate</h1>
    //   <div className="Hello">
    //     <a
    //       href="https://electron-react-boilerplate.js.org/"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="books">
    //           📚
    //         </span>
    //         Read our docs
    //       </button>
    //     </a>
    //     <a
    //       href="https://github.com/sponsors/electron-react-boilerplate"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="books">
    //           🙏
    //         </span>
    //         Donate
    //       </button>
    //     </a>
    //   </div>
    // </div>
  );
};

interface InitialWebSocketContextInterface {
  userID: string;
  ws: WebSocket;
}

interface WebSocketContextInterface {
  webSocket: InitialWebSocketContextInterface;
  handleLoginSuccess: (userID: string) => void;
}
export default function App() {
  const functionTemplate = () => {};

  const userObjectContext = {
    name: 'John Snow',
    email: 'john.snow@thewall.north',
    status: 'Winter is coming',
    updateStatus: functionTemplate,
  };

  const UserContext = React.createContext(userObjectContext);
  const [context, setContext] = React.useState(userObjectContext);
  const updateContext = (contextUpdates = {}) =>
    setContext((currentContext) => ({ ...currentContext, ...contextUpdates }));

  React.useEffect(() => {
    if (context?.updateStatus === functionTemplate) {
      updateContext({
        updateStatus: (value: string) => updateContext({ status: value }),
      });
    }
  }, [context?.updateStatus]);

  const [initialWSContext, setInitialWSContext] = React.useState<
    InitialWebSocketContextInterface
  >({
    userID: '',
    ws: new WebSocket('ws:/127.0.0.1:7070/'),
  });

  const handleLoginSuccess = (userID: string) => {
    setInitialWSContext({
      ...initialWSContext,
      // userID: userID,
      ['ws']: new WebSocket(`ws:/127.0.0.1:8080/ws?userID=${userID}`),
    });
  };

  const WebSocketContext = React.createContext<WebSocketContextInterface>({
    webSocket: initialWSContext,
    handleLoginSuccess: handleLoginSuccess,
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/projects" component={ProjectsPage} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </Router>
  );
}
