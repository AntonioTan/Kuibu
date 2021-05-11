/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 16:30:10
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 19:55:12
 */

export interface UserWsGanttTaskDateChangeMessage {
  type: string;
  projectID: string;
  editUserID: string;
  taskID: string;
  startDate: string;
  endDate: string;
}

