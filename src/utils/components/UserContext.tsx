/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-17 23:31:17
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-20 15:03:56
 */
import React, { useEffect } from 'react';

const stringFunctionTemplate = (key: string, val: string) => {};
const listFunctionTemplate = (key: string, val: Array<string>) => {};
const changeWebSocket = (address: string) => {};

export interface UserContextInterface {
  userID: string;
  userName: string;
  status: string;
  currentProjectID: string;
  friendIDList: Array<string>;
  sessionIDList: Array<string>;
  projectIDList: Array<string>;
  webSocket: WebSocket;
  updateStringField: (key: string, val: string) => void;
  updateListField: (key: string, val: Array<string>) => void;
  updateWebSocket: (address: string) => void;
}

export const userObjectContext: UserContextInterface = {
  userID: '',
  userName: '',
  status: 'Winter is coming',
  currentProjectID: '',
  friendIDList: [],
  sessionIDList: [],
  projectIDList: [],
  webSocket: new WebSocket('ws:/127.0.0.1:7070/'),
  updateStringField: stringFunctionTemplate,
  updateListField: listFunctionTemplate,
  updateWebSocket: changeWebSocket,
};

export const UserContext = React.createContext<UserContextInterface>(
  userObjectContext
);

export default function UserContextProviderComponent(props: any) {
  const [context, setContext] = React.useState<UserContextInterface>(
    userObjectContext
  );

  const updateContext = (contextUpdates = {}) =>
    setContext((currentContext) => ({ ...currentContext, ...contextUpdates }));
  // useEffect(() => {
  //   console.log(context);
  // }, [context]);
  React.useEffect(() => {
    if (context?.updateStringField === stringFunctionTemplate) {
      updateContext({
        updateStringField: (key: string, value: string) =>
          updateContext({ [key]: value }),
        updateListField: (key: string, value: Array<string>) =>
          updateContext({ [key]: value }),
        updateWebSocket: (address: string) =>
          updateContext({ WebSocket: new WebSocket(address) }),
      });
    }
  }, [context?.updateStringField]);

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
