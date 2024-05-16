import { FC, useEffect, useState } from 'react';
import { task, useTask } from '../../store/useTask';
import styles from './Timer.module.css';
import { TimerBlock } from './TimerBlock';
import { TimerText } from './TimerText';


interface TimerProps { }

export const Timer: FC<TimerProps> = () => {
  const [activeTask, setActiveTask] = useState<task | null>(null)
  const tasks = useTask(state => state.tasks)
  const active = useTask(state => state.activeTask)
  useEffect(() => {
    if (tasks.length > 0) {
      const findTask = tasks.find(task => task.active === true) ?? active(tasks[0])
      findTask && setActiveTask(findTask)
    }
  }, [active, tasks])

  return (
    <div className={styles.timer}>
      <TimerText />
      {activeTask && tasks.length > 0 ? <TimerBlock task={activeTask} /> : <TimerBlock
        task={{ task: 'undefined', pomidor: 0, active: false, date: new Date().toLocaleDateString() }}
        />}
    </div>
  )
};




