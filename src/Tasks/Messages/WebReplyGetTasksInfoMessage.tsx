/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-02 09:35:08
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-02 09:35:53
 */

export interface WebReplyGetTasksInfoMessage {
  type: string;
  taskMap: { [key: string]: string };
}
