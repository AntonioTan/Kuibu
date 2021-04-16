/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-21 23:09:56
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-15 23:45:03
 */
import React, { Props } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  ListItemAvatar,
} from '@material-ui/core';
import ProfileBadge from './ProfileBadge';

interface MessageBoxInterface {
  senderName: string;
  message: string;
  whetherReverse: boolean;
}

export class MessageBox extends React.Component<MessageBoxInterface, Object> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const flexDirection = !this.props.whetherReverse ? 'row-reverse' : 'row';
    return (
      <Box
        display="flex"
        flexDirection={flexDirection}
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="grey.300">
          <List style={{ width: 500 }}>
            <ListItem
              style={{
                // width: 500,
                display: 'flex',
                flexDirection: flexDirection,
              }}
            >
              <ListItemAvatar>
                <ProfileBadge senderName={this.props.senderName}></ProfileBadge>
              </ListItemAvatar>
              <ListItemText
                primary={this.props.senderName}
                secondary={this.props.message}
                secondaryTypographyProps={{ style: { wordWrap: 'break-word' } }}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}
