/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-07 14:06:52
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-07 14:08:23
 */

import { ChatMessageInterface } from "../DataInterface/ChatMessageInterface";

export interface UserWsChatMessage {
  type: string;
  chatMessage: ChatMessageInterface
}

