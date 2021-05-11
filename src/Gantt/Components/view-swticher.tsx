/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-06 12:12:55
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 16:45:03
 */
import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import { Button, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs, Theme } from "@material-ui/core";
interface ViewSwitcherProps {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
  handleSubmitGanttDateChange: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
    },
    formControl: {
      minWidth: 120,
    },
  }),
);

export function ViewSwitcher(props: ViewSwitcherProps){
  const [open, setOpen] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<number>(1);
  const timeIntervals = ['Quarter of Day', 'Half of Day', 'Day', 'Week', 'Month']
  const classes = useStyles()
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = (e: React.ChangeEvent<{value: unknown}>) => {
    const newValue1 = e.target.value as number
    setTimeInterval(newValue1)
    if(newValue1===0) {
      props.onViewModeChange(ViewMode.QuarterDay);
    } else if(newValue1 == 1) {
      props.onViewModeChange(ViewMode.HalfDay)
    } else if(newValue1 === 2) {
      props.onViewModeChange(ViewMode.Day)
    } else if(newValue1 === 3) {
      props.onViewModeChange(ViewMode.Week)
    } else {
      props.onViewModeChange(ViewMode.Month)
    }
  }
  return (
    <div className="ViewContainer" style={{position: 'fixed', width:'1000px', height: '80px', backgroundColor: '#fafafa'}}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" color="primary" className={classes.button} onClick={props.handleSubmitGanttDateChange}>
            提交修改结果
          </Button>
        </Grid>
        <Grid item>
     <Button onClick={handleOpen} className={classes.button}> 选择时间长度 </Button>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">时间长度</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={timeInterval}
          onChange={handleChange}
        >
          {
            timeIntervals.map((value, index) => {
              return <MenuItem value={timeIntervals.indexOf(value)}>{value}</MenuItem>
            })
          }
        </Select>
          </FormControl>
        </Grid>
        <Grid item>


      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={props.isChecked}
            onClick={() => props.onViewListChange(!props.isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
        </Grid>
      </Grid>
    </div>
  );
};
