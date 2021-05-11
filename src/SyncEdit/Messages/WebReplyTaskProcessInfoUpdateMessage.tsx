/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 11:29:22
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 11:58:30
 */

import { TaskProcessInfoInterface } from "../DataInterface/TaskProcessInfoInterface";

export interface WebReplyTaskProcessInfoUpdateMessage {
  type: string;
  outcome: boolean;
  newTaskProcessInfo: TaskProcessInfoInterface
}


