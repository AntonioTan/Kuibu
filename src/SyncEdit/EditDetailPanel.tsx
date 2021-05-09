/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-08 20:06:49
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-09 01:03:54
 */

import { Avatar, Checkbox, createStyles, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, List, ListItem, ListItemText, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatarSmall: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '17px',
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export function EditDetailPanel(props: any) {

  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{

  }


  return (
    <div>
      <Paper style={{padding:20, overflow: 'auto', width: 800, height: 600}}>
      <Grid container direction="column" spacing={2}>
      <Grid item>
          <Typography variant="h6">Task Name</Typography>
        </Grid>
        <Grid item>
          <Typography>Leader: Tianyi</Typography>
        </Grid>
        <Grid item>
          <Typography>开始于: 2021/05/03</Typography>
        </Grid>
        <Grid item>
          <Typography>预计结束于: 2021/05/06</Typography>
        </Grid>
        <Divider></Divider>
        <Grid item>
        <FormControl component="fieldset">
        <FormLabel component="legend">待完成</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={false} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={false} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={false} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>
          正在编辑:
          <AvatarGroup max={3}>
            <Avatar alt="Phoebie" className={classes.avatarSmall}>P</Avatar>
            </AvatarGroup>
        </FormHelperText>
      </FormControl>
        </Grid>
        <Divider></Divider>
        <Grid item>
          <Typography variant="subtitle1">已完成</Typography>
          <List>
          <ListItemText
          primary="下蹲训练"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                由Scott, Alex, Jennifer完成
              </Typography>
              {" --每周下蹲三次"} //description
            </React.Fragment>
          }
        />
          </List>
        </Grid>
        <Divider></Divider>
        <Grid item>
          <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
         >
           <Grid item>
             编辑任务完成情况
           </Grid>
           <Grid item>
             <Grid container direction="row" alignItems="center">
               <Grid item>
                 正在编辑:
               </Grid>
               <Grid item>

                        <AvatarGroup max={3} style={{right: 0}}>
            <Avatar alt="Phoebie" className={classes.avatarSmall}>P</Avatar>
            </AvatarGroup>
               </Grid>

             </Grid>

           </Grid>

        </Grid>
        </Grid>
        <Grid item>
          <TextField
          label={"Tianyi"}
          multiline
          rowsMax={4}
          variant="outlined" style={{width: 700}}>
          </TextField>
        </Grid>

      </Grid>

      </Paper>
    </div>
  );
}
