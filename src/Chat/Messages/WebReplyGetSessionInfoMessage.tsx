import { ChatSessionInfoInterface } from "../DataInterface/ChatSessionInfoInterface";

/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-04 09:41:15
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-04 09:44:53
 */
export interface WebReplyGetSessionInfoMessage {
  type: string;
  chatSessionInfo: ChatSessionInfoInterface;
}
