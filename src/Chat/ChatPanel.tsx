/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-19 19:03:06
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-10 23:37:09
 */
import React, { useState, KeyboardEvent } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Paper,
  InputBase,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import { MessageBox } from './components/MessageBox';
import SendIcon from '@material-ui/icons/Send';
import { UserWebGetSessionInfoMessage } from './Messages/UserWebGetSessionInfoMessage';
import axios from 'axios';
import { serverAddress } from '../utils/globals';
import { ChatMessage } from './DataInterface/ChatMessage';
import { WebReplyGetSessionInfoMessage } from './Messages/WebReplyGetSessionInfoMessage';
import { ChatSessionInfoInterface } from './DataInterface/ChatSessionInfoInterface';
import { ChangeEvent } from 'react';
import { ChatMessageInterface } from './DataInterface/ChatMessageInterface';
import { UserWsChatMessage } from './Messages/UserWsChatMessage';
import Alert from '@material-ui/lab/Alert';
import { SnackBarInterface } from '../Login/views/LoginPanel';


interface ChatPanelInterface {
  sessionID: string;
}


const fakeSelfID = 'aaaaaaaaaa';

export default function ChatPanel(props: ChatPanelInterface) {
  console.log(props.sessionID)
  const scrollRef = React.useRef(null);
  const [selfID, setSelfID] = React.useState<string>("");
  const [initial, setInitial] = React.useState<number>(1);
  const ws = React.useRef<WebSocket>(new WebSocket(`ws:127.0.0.1:8080/ws?userID=${window.localStorage.getItem("userID")}`))
  React.useEffect(() => {
    return () => ws.current.close();
}, []);
  React.useEffect( () => {
    ws.current.onmessage = (res) => {
        console.log("new message from ws", res)
        const newMsg = JSON.parse(res.data)
        // console.log('initial', initial)
        // // setInitial(1)
        if(newMsg.type == "UserWsChatMessage") {
          const newChatMessage: UserWsChatMessage = newMsg as UserWsChatMessage
        } else if(newMsg.type == "UserWsInfoMessage") {

        } else if(newMsg.type == "UserWsPushChatMessage") {
          setInitial(1)
        }

      }
  }, [])

  const [chatInputValue, setChatInputValue] = React.useState<string>("")
  const [chatSessionInfo, setChatSessionInfo] = React.useState<ChatSessionInfoInterface>({
    sessionID: props.sessionID,
    sessionName: "正在获取...",
    userMap: {},
    taskID: "",
    chatMessageList: [],
  });
  const [chatMessage, setChatMessage] = React.useState<ChatMessageInterface>({
    sessionID: props.sessionID,
    senderID: "",
    message: "",
    sendDate: "",
  })

  const [whetherOpenAlertSnackBar, setWhetherOpenAlertSnackBar] = React.useState<boolean>(false)
  const [alertSnackBar, setAlertSnackBar] = useState<SnackBarInterface>({
    snackBarTitle: '',
    snackBarContent: '',
  });
  const handleAlertSnackBarClose = () => {
    setWhetherOpenAlertSnackBar(false);
  };

  React.useEffect(() => {
    const userID = window.localStorage.getItem("userID")||""
    setSelfID(userID);
    setChatMessage({
      ...chatMessage,
      ['sessionID']: props.sessionID,
    })
    setChatSessionInfo({
      ...chatSessionInfo,
      ['sessionID']: props.sessionID,
    })
    if(chatSessionInfo.sessionID!=""){
      const userWebGetSessionInfoMessage: UserWebGetSessionInfoMessage = {
        type: "UserWebGetSessionInfoMessage",
        sessionID: props.sessionID,
      }
      const getSessionInfoPromise = () =>
        axios.post(
          `${serverAddress}/web`,
          JSON.stringify(userWebGetSessionInfoMessage)
        )
      axios.all([getSessionInfoPromise()]).then(
        axios.spread((getSessionInfoRst) => {
          const webReplyGetSessionInfoMessage: WebReplyGetSessionInfoMessage = getSessionInfoRst.data
          setChatSessionInfo(webReplyGetSessionInfoMessage.chatSessionInfo);
          setChatMessage({
            ...chatMessage,
            ['senderID']: userID,
          })
        })
      )
      if (scrollRef.current) {
        (scrollRef!.current! as any).scrollIntoView({ behaviour: "smooth" });
      }
    setInitial(0);
    }
  }, [initial, props.sessionID])

  // React.useEffect(() => {
  //   if(ws.current.OPEN||false) {

  //   }
  // }, [ws.current.OPEN])

  let initialMessageList = [];
  for (var i = 0; i < 10; i++) {
    initialMessageList.push(
      <div key={i + 1}>
        <Box
          display="flex"
          flexDirection={i % 2 == 0 ? 'row-reverse' : 'row'}
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Box p={1} bgcolor="grey.300">
            <List style={{ width: 500 }}>
              <ListItem
                style={{
                  width: 500,
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={`Item ${i}`} />
              </ListItem>
            </List>
          </Box>
        </Box>
      </div>
    );
  }
  const [messageList, setMessageList] = React.useState(initialMessageList);
  const loadFunc = () => {
    // console.log('here we are!');
    // let newMessageList = Object.assign([], messageList);
    // newMessageList.push(
    //   <MessageBox
    //     index={newMessageList.length}
    //     name={`message ${newMessageList.length}`}
    //   ></MessageBox>
    // );
    // console.log(newMessageList.length);
    // setMessageList(newMessageList);
  };
  const loader: JSX.Element = (
    <div className="loader" key={0} id="loader">
      Loading ...
    </div>
  );

  const handleEnterInput = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      handleSendMessageClick()
    }
  };

  const handleChatMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChatInputValue(e.currentTarget.value)
    setChatMessage({
      ...chatMessage,
      ['message']: e.currentTarget.value,
    })
  }

  const handleSendMessageClick = () => {
    console.log(ws.current.OPEN)
    if(ws.current.OPEN) {
      const userWsChatMessage: UserWsChatMessage= {
        type: "UserWsChatMessage",
        chatMessage: {
          ...chatMessage,
         ['sendDate']: new Date().toISOString(),
         ['sessionID']: props.sessionID,
        }
      }
      console.log(JSON.stringify(userWsChatMessage))
      ws.current.send(JSON.stringify(userWsChatMessage))
      setChatInputValue("")

    } else {
       setAlertSnackBar({
            snackBarTitle: '网络问题',
            snackBarContent: 'WebSocket尚未连接',
          });
      setWhetherOpenAlertSnackBar(true);

    }
  }

  return (
    <div>
      <Snackbar
        open={whetherOpenAlertSnackBar}
        autoHideDuration={6000}
        onClose={handleAlertSnackBarClose}
        style={{
          marginBottom: '550px',
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <Alert
          variant="outlined"
          onClose={handleAlertSnackBarClose}
          severity="error"
        >
          {`${alertSnackBar.snackBarTitle}: ${alertSnackBar.snackBarContent}`}
        </Alert>
      </Snackbar>
      <div>
        <Typography variant="h6">{chatSessionInfo.sessionName}</Typography>
      </div>
      <Paper id="message-paper" style={{width: 800, height: 550, overflow: 'auto'}}>
        {loader}
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true}
          loader={loader}
          useWindow={false}
          isReverse={true}
        >
          {/* {messageList} */}
          {chatSessionInfo.chatMessageList.map((chatMessage) => {
            return (
              <MessageBox
                whetherReverse={chatMessage.senderID != selfID}
                senderName={chatMessage.senderName}
                message={chatMessage.message}
              ></MessageBox>
            );
          })}
        </InfiniteScroll>
        <div ref={scrollRef} />

      </Paper>
      <div>
        <InputBase
          value={chatInputValue}
          placeholder="请输入"
          style={{ width: 750 }}
          id="chatInput"
          inputProps={{ 'aria-label': 'input chat message' }}
          onKeyPress={handleEnterInput}
          onChange={handleChatMessageChange}
        ></InputBase>
        <IconButton onClick={handleSendMessageClick}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
