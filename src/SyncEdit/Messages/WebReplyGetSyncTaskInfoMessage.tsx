/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-09 20:05:20
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 20:05:47
 */

import { SyncTaskInfoInterface } from "../DataInterface/SyncTaskInterface";

export interface WebReplyGetSyncTaskInfoMessage {
  type: string;
  syncTaskInfo: SyncTaskInfoInterface;
}
