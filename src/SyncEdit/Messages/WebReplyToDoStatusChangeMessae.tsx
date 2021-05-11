/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-11 09:06:43
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 09:24:08
 */

export interface WebReplyToDoStatusChangeMessage {
  type: string;
  outcome: boolean;
  endDate: string;
}
