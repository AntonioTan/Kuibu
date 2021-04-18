/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-17 23:31:17
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-18 14:35:55
 */
import React from 'react';

const functionTemplate = (val: string) => {};
const changeWebSocket = (address: string) => {};

const userObjectContext = {
  name: 'John Snow',
  email: 'john.snow@thewall.north',
  status: 'Winter is coming',
  updateStatus: functionTemplate,
  webSocket: new WebSocket('ws:/127.0.0.1:7070/'),
  updateWebSocket: changeWebSocket,
};

export const UserContext = React.createContext(userObjectContext);

export default function UserContextProviderComponent(props: any) {
  const [context, setContext] = React.useState(userObjectContext);

  const updateContext = (contextUpdates = {}) =>
    setContext((currentContext) => ({ ...currentContext, ...contextUpdates }));

  React.useEffect(() => {
    if (context?.updateStatus === functionTemplate) {
      updateContext({
        updateStatus: (value: string) => updateContext({ status: value }),
        updateWebSocket: (address: string) =>
          updateContext({ WebSocket: new WebSocket(address) }),
      });
    }
  }, [context?.updateStatus]);

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
