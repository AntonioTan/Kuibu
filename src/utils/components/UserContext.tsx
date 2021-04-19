/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-17 23:31:17
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-19 13:28:21
 */
import React from 'react';

const stringFunctionTemplate = (key: string, val: string) => {};
const listFunctionTemplate = (key: string, val: Array<string>) => {};
const changeWebSocket = (address: string) => {};

const userObjectContext = {
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

export const UserContext = React.createContext(userObjectContext);

export default function UserContextProviderComponent(props: any) {
  const [context, setContext] = React.useState(userObjectContext);

  const updateContext = (contextUpdates = {}) =>
    setContext((currentContext) => ({ ...currentContext, ...contextUpdates }));

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
