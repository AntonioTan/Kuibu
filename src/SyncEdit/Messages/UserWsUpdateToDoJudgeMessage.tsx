/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 08:27:22
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 08:31:02
 */

export interface UserWsUpdateToDoJudgeMessage {
  type: string;
  taskID: string;
  taskToDoID: string;
  outcome: boolean;
}
