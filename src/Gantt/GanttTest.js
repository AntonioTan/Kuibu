/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-05-06 10:22:18
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-06 10:24:44
 */

export function GanttTest(props) {
  let tasks = [{
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type: 'task',
      progress: 45,
      isDisabled: true,
      styles: {
        progressColor: '#ffbb54',
        progressSelectedColor: '#ff9e0d'
      },
    },

  ];
  return ( <
    Gantt tasks = {
      tasks
    }
    />

  )
}
