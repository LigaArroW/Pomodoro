import { FC, useEffect, useState } from 'react';
import { task, useTask } from '../../store/useTask';
import styles from './Timer.module.css';
import { TimerBlock } from './TimerBlock';
import { TimerText } from './TimerText';

interface TimerProps { }

export const Timer: FC<TimerProps> = () => {
  const [activeTask, setActiveTask] = useState<task | null>(null)
  const tasks = useTask(state => state.tasks)

  useEffect(() => {
    if (tasks.length > 0) {
      const findTask = tasks.find(task => task.active === true)
      findTask && setActiveTask(findTask)
    }
  }, [tasks])

  return (
    <div className={styles.timer}>
      <TimerText />
      {activeTask && <TimerBlock task={activeTask} />}
    </div>
  )
};




