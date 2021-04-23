/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-10 21:38:32
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-23 17:41:32
 */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Paper,
  PaperProps,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import { UserWebGetMemberMapMessage } from '../../Projects/components/CreateProjectDialog';
import { serverAddress } from '../../utils/globals';

interface SelectMemberDialogInterface {
  whetherSelectMember: boolean;
  handleWhetherSelectMember: (val: boolean) => void;
  handleCheckMember: (event: React.ChangeEvent<HTMLInputElement>) => void;
  memberIDSelectMap: { [index: string]: boolean };
  handleCancelClick: () => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
export const SelectMemberDialog = (props: SelectMemberDialogInterface) => {
  const [initial, setInitial] = React.useState<number>(1);
  const [memberMap, setMemberMap] = React.useState<{
    [key: string]: string;
  } | null>();
  useEffect(() => {
    const memberIDs: Array<string> = Object.entries(
      props.memberIDSelectMap
    ).map((memberID: [string, boolean]) => memberID[0]);
    const userWebGetMemberMapMessage: UserWebGetMemberMapMessage = {
      type: 'UserWebGetMemberMapMessage',
      userIDs: memberIDs,
    };
    const getMemberMapPromise = () =>
      axios.post(
        `${serverAddress}/web`,
        JSON.stringify(userWebGetMemberMapMessage)
      );
    axios.all([getMemberMapPromise()]).then(
      axios.spread((memberMapRst) => {
        setMemberMap(memberMapRst.data.memberMap);
      })
    );
    setInitial(0);
  }, [initial == 1]);

  const handleConfirmClick = () => {
    setInitial(1);
    props.handleWhetherSelectMember(false);
  };

  const handleCancelClick = () => {
    setInitial(1);
    props.handleCancelClick();
    props.handleWhetherSelectMember(false);
  };

  // console.log(props.memberIDSelectMap);
  return (
    <Dialog
      open={props.whetherSelectMember}
      scroll="paper"
      style={{ width: '350px', height: '450px' }}
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <Typography variant="subtitle1" style={{ userSelect: 'none' }}>
          选取组员
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormGroup row={false}>
          {Object.entries(props.memberIDSelectMap).map(
            (memberID: [string, boolean]) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={memberID[0]}
                      name={memberMap?.[memberID[0]]}
                      checked={memberID[1]}
                      onChange={props.handleCheckMember}
                      color="primary"
                    ></Checkbox>
                  }
                  label={memberMap?.[memberID[0]]}
                ></FormControlLabel>
              );
            }
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleConfirmClick}>
          确定
        </Button>
        <Button
          style={{ color: 'red', borderColor: 'red' }}
          variant="outlined"
          onClick={handleCancelClick}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};
