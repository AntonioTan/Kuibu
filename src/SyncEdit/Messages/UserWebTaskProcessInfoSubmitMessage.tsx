/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 11:22:27
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 12:39:56
 */

export interface UserWebProcessInfoUpdateMessage{
  type: string;
  taskID: string;
  editUserID: string;
  content: string;
}
