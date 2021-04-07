/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-06 16:22:43
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

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={ProjectsPage} />
      </Switch>
    </Router>
  );
}
