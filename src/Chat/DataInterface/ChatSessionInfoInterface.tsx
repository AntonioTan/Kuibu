import { ChatMessage } from "./ChatMessage";

/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-04 09:42:14
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-04 09:45:48
 */
export interface ChatSessionInfoInterface {
  sessionID: string;
  sessionName: string;
  userMap: {[key: string]: string};
  taskID: string;
  chatMessageList: Array<ChatMessage>;
}
