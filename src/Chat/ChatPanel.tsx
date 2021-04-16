/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-19 19:03:06
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-15 23:36:00
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
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import { MessageBox } from './components/MessageBox';
import SendIcon from '@material-ui/icons/Send';

interface ChatMessageInterface {
  sessionID: string;
  senderID: string;
  senderName: string;
  message: string;
}

const fakeMessageList: Array<ChatMessageInterface> = [
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'cccccccccc',
    senderName: 'Hello',
    message: 'World',
  },
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'cccccccccc',
    senderName: 'Hello',
    message: 'World1',
  },
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'cccccccccc',
    senderName: 'Hello',
    message: 'World2',
  },
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'cccccccccc',
    senderName: 'Hello',
    message:
      'World3WorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorldWorld33333333333333333333',
  },
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'cccccccccc',
    senderName: 'Hello',
    message: 'World4',
  },
  {
    sessionID: 'bbbbbbbbbb',
    senderID: 'aaaaaaaaaa',
    senderName: 'Tianyi Tan',
    message: 'World4',
  },
];

const fakeSelfID = 'aaaaaaaaaa';

export default function ChatPanel() {
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
    console.log('here we are!');
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
      console.log('here!');
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h6">Chat Session</Typography>
      </div>
      <Paper style={{ width: 800, height: 550, overflow: 'auto' }}>
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
          {fakeMessageList.map((fakeMessage) => {
            return (
              <MessageBox
                whetherReverse={fakeMessage.senderID != fakeSelfID}
                senderName={fakeMessage.senderName}
                message={fakeMessage.message}
              ></MessageBox>
            );
          })}
        </InfiniteScroll>
      </Paper>
      <div>
        <InputBase
          placeholder="请输入"
          style={{ width: 750 }}
          id="chatInput"
          inputProps={{ 'aria-label': 'input chat message' }}
          onKeyPress={handleEnterInput}
        ></InputBase>
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
