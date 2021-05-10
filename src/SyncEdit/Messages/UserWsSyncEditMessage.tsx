/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-10 18:38:12
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-10 18:38:58
 */


export interface UserWsSyncEditMessage {
  type: string;
  taskID: string;
  editUserID: string;
  content: string;
}
