/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-09 17:18:11
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 17:18:12
 */

import { MyTaskInterface } from "../DataInterface/MyTaskInterface";

export interface WebReplyGetMyTaskListMessage {
  type: string;
  myTaskList: Array<MyTaskInterface>
}


