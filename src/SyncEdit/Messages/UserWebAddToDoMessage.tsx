/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 12:59:07
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 13:07:37
 */

import { TaskToDoInfoInterface } from "../DataInterface/TaskToDoInfoInterface";

export interface UserWebAddToDoMessage {
  type: string;
  taskID: string;
  newToDo: TaskToDoInfoInterface;
}


