/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 09:08:32
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 09:23:09
 */

export interface UserWsToDoStatusChangeMessage {
  type: string;
  taskID: string;
  taskToDoID: string;
  finishUserID: string;
  status: string;
  endDate: string;
}
