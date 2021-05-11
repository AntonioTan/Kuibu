/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 14:45:51
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 14:48:22
 */

export interface GanttTask {
  taskID: string;
  taskName: string;
  startDate: string;
  endDate: string;
  progress: number;
  parentID: string;
}
