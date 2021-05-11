/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 09:04:15
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 09:05:03
 */

export interface UserWebToDoStatusChangeMessage {
  type: string;
  taskToDoID: string;
  status: string;
  finishUserID: string;
}
