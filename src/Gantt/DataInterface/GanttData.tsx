/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 14:44:40
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 15:16:38
 */

import { GanttTask } from "./GanttTask";

export interface GanttData {
  projectID: string;
  projectName: string;
  startDate: string;
  allMemberMap: {[key: string]: string};
  taskList: Array<GanttTask>
}
