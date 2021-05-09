/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-04 09:44:12
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-07 22:10:52
 */

export interface ChatMessage {
  chatMessageID: string;
  sessionID: string;
  senderID: string;
  senderName: string;
  message: string;
  sendDate: string;
}
