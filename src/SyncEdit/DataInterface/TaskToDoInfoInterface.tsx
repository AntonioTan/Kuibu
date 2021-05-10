/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-09 18:52:55
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 19:54:25
 */

export interface TaskToDoInfoInterface {
  taskToDoID: string;
  status: string;
  createUserID: string;
  finishUserID: string;
  content: string;
  startDate: string;
  endDate: string;
}
