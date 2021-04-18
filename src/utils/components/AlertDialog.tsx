/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-18 23:28:28
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-18 23:54:07
 */

import {
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

export interface AlertDialogInterface {
  dialogTitle: string;
  dialogContent: string;
}

export const AlertDialog = (props: AlertDialogInterface) => {
  const [whetherOpenDialog, setWhetherOpenDialog] = useState<boolean>(true);
  return (
    <Dialog open={whetherOpenDialog}>
      <MuiDialogTitle disableTypography id="alert-dialog-title">
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6" style={{ userSelect: 'none' }}>
              {props.dialogTitle}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              style={{ right: 0 }}
              onClick={() => setWhetherOpenDialog(false)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiDialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogContent}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
