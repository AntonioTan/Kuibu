/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-10 21:38:32
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-16 22:16:38
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

import React from 'react';
import Draggable from 'react-draggable';

interface SelectMemberDialogInterface {
  whetherSelectMember: boolean;
  handleWhetherSelectMember: (val: boolean) => void;
  handleCheckMember: (event: React.ChangeEvent<HTMLInputElement>) => void;
  members: { [index: string]: boolean };
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
          {Object.entries(props.members).map((member: [string, boolean]) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    name={member[0]}
                    checked={member[1]}
                    onChange={props.handleCheckMember}
                    color="primary"
                  ></Checkbox>
                }
                label={member[0]}
              ></FormControlLabel>
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.handleWhetherSelectMember(false)}
        >
          确定
        </Button>
        <Button
          style={{ color: 'red', borderColor: 'red' }}
          variant="outlined"
          onClick={() => {
            props.handleCancelClick();
            props.handleWhetherSelectMember(false);
          }}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};
