/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 21:55:36
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 00:08:08
 */
import React from 'react'
import { EditDetailPanel } from './EditDetailPanel';
import { TaskListPanel } from './TaskListPanel';

export const SyncEditPanel = function(props: any) {
  const [editTaskID, setEditTaskID] = React.useState<string>("")
  const handleSetEditTaskID = (taskID: string) => {
    setEditTaskID(taskID)
  }
  return(
    <div>
      {
        editTaskID==""?
        (<TaskListPanel handleSetEditTaskID={handleSetEditTaskID}></TaskListPanel>):
        (<EditDetailPanel></EditDetailPanel>)
      }
    </div>

  );
}
