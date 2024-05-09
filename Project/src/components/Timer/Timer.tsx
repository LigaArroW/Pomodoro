import { FC, useEffect, useState } from 'react';
import styles from './Timer.module.css';
import { TimerText } from './TimerText';
import { TimerBlock } from './TimerBlock';
import { task, useTask } from '../../store/useTask';
import { DEFAULT_TIME } from '../../constants/DEFAULT_TIME';

interface TimerProps { }

export const Timer: FC<TimerProps> = () => {
  const [activeTask, setActiveTask] = useState<task>({ id: 0, task: 'Добавьте новые задания', timer: DEFAULT_TIME, active: true })
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
      <TimerBlock task={activeTask} />
    </div>
  )
};


