/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-21 23:09:56
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-03-22 15:47:30
 */
import React, { Props } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
} from '@material-ui/core';
import ProfileBadge from './ProfileBadge';

interface IProps {
  name: string;
  index: number;
}

export class MessageBox extends React.Component<IProps, Object> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Box
        display="flex"
        flexDirection={this.props.index % 2 == 0 ? 'row-reverse' : 'row'}
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <Box p={1} bgcolor="grey.300">
          <ProfileBadge></ProfileBadge>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <List style={{ width: 500 }}>
            <ListItem
              style={{
                // width: 500,
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <ListItemText primary={`Item ${this.props.index}`} />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}
