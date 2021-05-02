/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-02 16:48:02
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-02 16:48:22
 */

export interface NewTaskInterface {
  taskName: string;
  projectID: string;
  parentID: string;
  startDate: string;
  endDate: string;
  description: string;
  leaderIDList: Array<string>;
  userIDList: Array<string>;
}
