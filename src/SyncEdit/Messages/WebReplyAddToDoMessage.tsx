import { TaskToDoInfoInterface } from "../DataInterface/TaskToDoInfoInterface";

/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 13:01:07
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 13:01:50
 */
export interface WebReplyAddToDoMessage {
  type: string;
  outcome: boolean;
  newToDo: TaskToDoInfoInterface;
}
