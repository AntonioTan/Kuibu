import { GanttTask } from "../DataInterface/GanttTask";

/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 19:06:17
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 19:06:47
 */
export interface UserWebGanttDateChangeMessage {
  type: string;
  projectID: string;
  taskList: Array<GanttTask>;
}
