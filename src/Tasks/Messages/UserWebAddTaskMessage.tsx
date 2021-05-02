/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-02 10:11:34
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-02 10:36:39
 */

import { NewTaskInterface } from '../Components/CreateTaskDialog';

export interface UserWebAddTaskMessage {
  type: string;
  newTask: NewTaskInterface;
}
