/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 08:11:19
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 08:12:37
 */

export interface UserWebToDoJudgeMessage {
  type: string;
  taskToDoID: string;
  outcome: boolean;
}
