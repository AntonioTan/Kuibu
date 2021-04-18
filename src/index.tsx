/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-17 23:53:23
 */
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ConfigContext } from 'antd/lib/config-provider';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ProviderComponent from './utils/components/UserContext';
import { menuContext } from './utils/context';

interface InitialWebSocketContextInterface {
  userID: string;
  ws: WebSocket;
}

interface WebSocketContextInterface {
  webSocket: InitialWebSocketContextInterface;
  handleLoginSuccess: (userID: string) => void;
}

// const [initialWSContext, setInitialWSContext] = React.useState<
//   InitialWebSocketContextInterface
// >({
//   userID: '',
//   ws: new WebSocket('ws:/127.0.0.1:7070/'),
// });

// const handleLoginSuccess = (userID: string) => {
//   setInitialWSContext({
//     ...initialWSContext,
//     // userID: userID,
//     ['ws']: new WebSocket(`ws:/127.0.0.1:8080/ws?userID=${userID}`),
//   });
// };

// const WebSocketContext = React.createContext<WebSocketContextInterface>({
//   webSocket: initialWSContext,
//   handleLoginSuccess: handleLoginSuccess,
// });

const services = {
  services: ['Demo1', 'Demo2', 'Demo3'],
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f7385',
    },
    secondary: {
      main: '#d7ebed',
    },
    textPrimary: {
      main: '#d7ebed',
    },
  },
});
// render(<DatePicker />, document.getElementById('root'));
render(
  <ProviderComponent>
    <menuContext.Provider value={services}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </menuContext.Provider>
  </ProviderComponent>,
  document.getElementById('root')
);
