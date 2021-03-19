/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-19 19:03:06
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-20 01:07:03
 */
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

export default function ChatPage() {
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
    let newMessageList = Object.assign([], messageList);
    newMessageList.push(
      <Box
        display="flex"
        flexDirection={newMessageList.length % 2 == 0 ? 'row-reverse' : 'row'}
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="grey.300">
          <List style={{ width: 500 }}>
            <ListItem
              style={{
                width: 500,
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <ListItemText primary={`Item ${newMessageList.length}`} />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
    console.log(newMessageList.length);
    setMessageList(newMessageList);
  };
  const loader: JSX.Element = (
    <div className="loader" key={0} id="loader">
      Loading ...
    </div>
  );

  return (
    <div style={{ height: 700, overflow: 'auto' }}>
      {loader}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true}
        loader={loader}
        useWindow={false}
        isReverse={true}
      >
        {messageList}
      </InfiniteScroll>
    </div>
    // <Box
    //   display="flex"
    //   flexDirection="row-reverse"
    //   p={1}
    //   m={1}
    //   bgcolor="background.paper"
    // >
    //   <Box p={1} bgcolor="grey.300">
    //     <List style={{ width: 500 }}>
    //       <ListItem
    //         style={{
    //           width: 500,
    //           display: 'flex',
    //           flexDirection: 'row-reverse',
    //         }}
    //       >
    //         <ListItemText primary={'Item 1'} />
    //       </ListItem>
    //       <ListItem
    //         style={{
    //           width: 500,
    //           textAlign: 'right',
    //         }}
    //       >
    //         <ListItemText primary={'Item 1'} />
    //       </ListItem>
    //     </List>
    //   </Box>
    //   <Box p={1} bgcolor="grey.300">
    //     Item 2
    //   </Box>
    //   <Box p={1} bgcolor="grey.300">
    //     Item 3
    //   </Box>
    // </Box>
  );
}
