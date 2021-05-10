/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 21:55:36
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 23:36:04
 */
import React from 'react'
import { EditDetailPanel } from '../EditDetailPanel';
import { TaskListPanel } from './TaskListPanel';

interface SyncEditPanelInterface {
}

export const SyncEditPanel = function(props: SyncEditPanelInterface) {
  const [initial, setInitial] = React.useState<number>(1);
  const [editTaskID, setEditTaskID] = React.useState<string>("")
  const [whetherEditTask, setWhetherEditTask] = React.useState<boolean>(false)
  const handleSetEditTaskID = (taskID: string) => {
    setEditTaskID(taskID)
    setWhetherEditTask(true)
  }

  const handleWhetherEditTask: (val: boolean)=>void = (val: boolean) => {
    setWhetherEditTask(val);
  }

  return(
    <div>
      {
        !whetherEditTask?
        (<TaskListPanel handleSetEditTaskID={handleSetEditTaskID}></TaskListPanel>):
        (<EditDetailPanel handleWhetherEditTask={handleWhetherEditTask} taskID={editTaskID}></EditDetailPanel>)
      }
    </div>

  );
}
