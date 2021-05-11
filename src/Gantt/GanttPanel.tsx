/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-05 22:53:37
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 20:37:08
 */

import { GanttPanelInterface } from "./DataInterface/GanttPanelInterface";
import React, { useState } from "react";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { ViewSwitcher } from "./Components/view-swticher";
import { Grid, Snackbar } from "@material-ui/core";
import { UserWebGetGanttDataMessage } from "./Messages/UserWebGetGanttDataMessage";
import { serverAddress, wsAddress } from "../utils/globals";
import axios from "axios";
import { WebReplyGetGanttDataMessage } from "./Messages/WebReplyGetGanttDataMessage";
import { GanttData } from "./DataInterface/GanttData";
import { UserWsGanttTaskDateChangeMessage } from "./Messages/UserWsGanttTaskDateChangeMessage";
import UserContextProviderComponent from "../utils/components/UserContext";
import { GanttTask } from "./DataInterface/GanttTask";
import { UserWsGanttUpdateMessage } from "./Messages/UserWsGanttUpdateMessage";
import { UserWebGanttDateChangeMessage } from "./Messages/UserWebGanttDateChangeMessage";
import { WebReplyGanttDateChangeMessage } from "./Messages/WebReplyGanttDateChangeMessage";
import { Alert } from "@material-ui/lab";
import { SnackBarInterface } from "../Login/views/LoginPanel";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

const convertToTaskList: (val: GanttData)=>Array<Task> = (ganttData: GanttData) => {
  var ganttTaskList: Array<Task> = ganttData.taskList.map(ganttTask => {
    return {
      id: ganttTask.taskID,
      type: "task",
      name: ganttTask.taskName,
      progress: ganttTask.progress,
      start: new Date(ganttTask.startDate),
      end: new Date(ganttTask.endDate),
      dependencies: [ganttTask.parentID]
    }
  })
  const endDate = ganttTaskList.length>0?ganttTaskList.sort((a,b) => a.end>b.end?-1:1)[0].end:new Date()
  ganttTaskList.unshift(
    {
      id: ganttData.projectID,
      name: ganttData.projectName,
      type: "project",
      start: new Date(ganttData.startDate),
      end: endDate,
      progress: Math.floor(ganttTaskList.map(ganttTask => ganttTask.progress).reduce((a,b)=>a+b, 0) / ganttData.taskList.length)
    }
  )
  return ganttTaskList;
}

export default function GanttPanel(props: GanttPanelInterface) {
  const userID: string = window.localStorage.getItem("userID")||""
  const [initial, setInitial] = React.useState<number>(1);
  const ws = React.useRef(new WebSocket(`${wsAddress}/ws?userID=${window.localStorage.getItem("userID")}`))
  // ws.current = new WebSocket(`${wsAddress}/ws?userID=${window.localStorage.getItem("userID")}`)
  React.useEffect(() => {
    return () => ws.current.close();
}, []);
  const [ganttData, setGanttData] = React.useState<GanttData>({
    projectID: "",
    projectName: "",
    startDate: "",
    allMemberMap: {},
    taskList: [],
  })
  const [taskList, setTaskList] = React.useState<Array<Task>>(initTasks());
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  const [whetherOpenAlertSnackBar, setWhetherOpenAlertSnackBar] = React.useState<boolean>(false)
  const [alertSnackBar, setAlertSnackBar] = useState<SnackBarInterface>({
    snackBarTitle: '',
    snackBarContent: '',
  });
  const handleAlertSnackBarClose = () => {
    setWhetherOpenAlertSnackBar(false);
  };
  ws.current.onmessage = (res) => {
    const data = JSON.parse(res.data)
    if(data.type == "UserWsGanttTaskDateChangeMessage") {
      const userWsGanttTaskDateChangeMessage: UserWsGanttTaskDateChangeMessage = data as UserWsGanttTaskDateChangeMessage
      if(userWsGanttTaskDateChangeMessage.editUserID != userID) {
        var newTaskList: Array<Task> = [];
        taskList.map(task => {
          if(task.id==userWsGanttTaskDateChangeMessage.taskID) {
            task.start = new Date(userWsGanttTaskDateChangeMessage.startDate)
            task.end = new Date(userWsGanttTaskDateChangeMessage.endDate)
          }
          newTaskList.push(task);
        })
        setTaskList(newTaskList)
      }

    } else if(data.type == "UserWsGanttUpdateMessage") {
      console.log("gantt update", data)
      const userWsGanttUpdateMessage: UserWsGanttUpdateMessage = data as UserWsGanttUpdateMessage
      setInitial(1)
      setAlertSnackBar({
        snackBarTitle: "甘特图更新",
        snackBarContent: `来自${ganttData.allMemberMap[userWsGanttUpdateMessage.editUserID]}的更新`
      })
      setWhetherOpenAlertSnackBar(true);


    }
  }

  React.useEffect(
    () => {
      const currentProjectID = window.localStorage.getItem("currentProjectID")||""
      const userWebGetGanttDataMessage: UserWebGetGanttDataMessage = {
        type: "UserWebGetGanttDataMessage",
        projectID: currentProjectID
      }
      const getGanttDataPromise = () =>
        axios.post(`${serverAddress}/web`, JSON.stringify(userWebGetGanttDataMessage))

      axios.all([getGanttDataPromise()]).then(
        axios.spread((getGanttDataRst) => {
          const webReplyGetGanttDataMessage: WebReplyGetGanttDataMessage= getGanttDataRst.data as WebReplyGetGanttDataMessage
          const ganttData = webReplyGetGanttDataMessage.ganttData
          setGanttData(ganttData)
          const taskList = convertToTaskList(ganttData)
          setTaskList(taskList)
        })
      )
      setInitial(0)

    }, [initial]
  )

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const onTaskChange = (task: Task) => {
    const userWsGanttTaskDateChangeMessage:  UserWsGanttTaskDateChangeMessage = {
      type: "UserWsGanttTaskDateChangeMessage",
      projectID: window.localStorage.getItem("currentProjectID")||"",
      taskID: task.id,
      editUserID: window.localStorage.getItem("userID")||"",
      startDate: task.start.toISOString(),
      endDate: task.end.toISOString(),
    }
    ws.current.send(JSON.stringify(userWsGanttTaskDateChangeMessage))
    const newTaskList: Array<Task> = taskList.map(t => (t.id === task.id ? task : t))
    setTaskList(newTaskList)

    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const onTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const onProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const onDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const onSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleSubmitGanttDateChange = () => {
    const ganttTaskList: Array<GanttTask> = taskList.map(task => {
      return {
        taskID: task.id,
        taskName: task.name,
        startDate: task.start.toISOString(),
        endDate: task.end.toISOString(),
        progress: task.progress,
        parentID: "",
      }
    });
    const userWebGanttDateChangeMessage: UserWebGanttDateChangeMessage = {
      type: "UserWebGanttDateChangeMessage",
      projectID: window.localStorage.getItem("currentProjectID")||"",
      taskList: ganttTaskList,
    }
    axios.post(`${serverAddress}/web`, JSON.stringify(userWebGanttDateChangeMessage)).then(
      res => {
        const webReplyGanttDateChangeMessage: WebReplyGanttDateChangeMessage = res.data as WebReplyGanttDateChangeMessage
        if(webReplyGanttDateChangeMessage.outcome) {
          const userWsGanttUpdateMessage: UserWsGanttUpdateMessage = {
            type: "UserWsGanttUpdateMessage",
            projectID: webReplyGanttDateChangeMessage.projectID,
            editUserID: userID,
          }
          ws.current.send(JSON.stringify(userWsGanttUpdateMessage));
        }

      }
    )
  }



  return (
    <div>
      <Snackbar
        open={whetherOpenAlertSnackBar}
        autoHideDuration={6000}
        onClose={handleAlertSnackBarClose}
        style={{
          marginBottom: '550px',
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <Alert
          variant="outlined"
          onClose={handleAlertSnackBarClose}
          severity="info"
        >
          {`${alertSnackBar.snackBarTitle}: ${alertSnackBar.snackBarContent}`}
        </Alert>
      </Snackbar>
      {/* <div style={{position: 'fixed', width: '150px', height: '600px', marginLeft: '-180px', backgroundColor: '#fafafa', zIndex: 0}}></div> */}
      <Grid container
      spacing={2}
      direction="column"
      style={{
        zIndex: -1
      }}
      >
        <Grid item>

        </Grid>
      <Grid item>
     <ViewSwitcher
        handleSubmitGanttDateChange={handleSubmitGanttDateChange}
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      </Grid>
      <Grid item></Grid>
      <Grid item style={{marginTop: '60px'}}>
      <Gantt
        tasks={taskList}
        viewMode={view}
        onDateChange={onTaskChange}
        onDelete={onTaskDelete}
        onProgressChange={onProgressChange}
        onDoubleClick={onDblClick}
        onSelect={onSelect}
        listCellWidth={isChecked ? "135px" : ""}
        ganttHeight={540}
        columnWidth={columnWidth}
      />
      </Grid>
      </Grid>
      </div>
  );
}

