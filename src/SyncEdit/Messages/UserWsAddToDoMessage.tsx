/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 13:03:16
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 13:03:36
 */

import { TaskToDoInfoInterface } from "../DataInterface/TaskToDoInfoInterface";

export interface UserWsAddToDoMessage {
  type: string;
  newToDo: TaskToDoInfoInterface;
}
