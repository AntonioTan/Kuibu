/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 11:35:03
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 12:26:29
 */

import { TaskProcessInfoInterface } from "../DataInterface/TaskProcessInfoInterface";

export interface UserWsTaskProcessInfoUpdateMessage {
  type: string;
  taskID: string;
  newTaskProcessInfo: TaskProcessInfoInterface;

}
