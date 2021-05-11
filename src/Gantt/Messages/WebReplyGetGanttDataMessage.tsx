/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 14:41:53
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 19:05:38
 */

import { GanttData } from "../DataInterface/GanttData";

export interface WebReplyGetGanttDataMessage {
  type: string;
  ganttData: GanttData;
}

