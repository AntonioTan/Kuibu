/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-09 18:50:38
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 22:57:55
 */

import { TaskProcessInfoInterface } from "./TaskProcessInfoInterface";
import { TaskToDoInfoInterface } from "./TaskToDoInfoInterface";

export interface SyncTaskInfoInterface {
  taskID: string;
  taskName: string;
  leaderName: string;
  leaderIDList: Array<string>;
  startDate: string;
  endDate: string;
  description: string;
  toDoList: Array<TaskToDoInfoInterface>
  processInfoList: Array<TaskProcessInfoInterface>
  allMemberMap: {[key: string]: string};

}


