/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 19:03:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 19:37:10
 */
export interface UserWsGanttUpdateMessage {
  type: string;
  projectID: string;
  editUserID: string;
}
