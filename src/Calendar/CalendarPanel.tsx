/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-06 21:42:32
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-11 15:31:39
 */
import React from 'react'
import { Event, Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from 'events';

export default function CalendarPanel(props: any) {
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const myEventsList: Event[] = [
    {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2021, 3, 0),
    end: new Date(2021, 3, 1),
  },
  {
    title: 'Long Event',
    start: new Date(2021, 3, 7),
    end: new Date(2021, 3, 10),
  },

  {
    title: 'DTS STARTS',
    start: new Date(2021, 2, 13, 0, 0, 0),
    end: new Date(2021, 2, 20, 0, 0, 0),
  },

  {
    title: 'DTS ENDS',
    start: new Date(2021, 10, 6, 0, 0, 0),
    end: new Date(2021, 10, 13, 0, 0, 0),
  },

  {
    title: 'Some Event',
    start: new Date(2021, 3, 9, 0, 0, 0),
    end: new Date(2021, 3, 10, 0, 0, 0),
  },
  {
    title: 'Conference',
    start: new Date(2021, 3, 11),
    end: new Date(2021, 3, 13),
  },

  ];
  return (
    <div style={{width: '800px', height: '600px'}}>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
  );
}
