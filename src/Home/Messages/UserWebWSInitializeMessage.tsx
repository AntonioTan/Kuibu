/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-05 20:39:32
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 23:59:51
 */

export interface UserWebWSInitializeMessage {
  type: string;
  lastProjectID: string;
  projectID: string;
  userID: string;
}
