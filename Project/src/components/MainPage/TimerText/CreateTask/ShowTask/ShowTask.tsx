import { FC } from 'react';
import styles from './ShowTask.module.css';
import { task } from '../../../../../store/useTask';

interface ShowTaskProps {
  task: task
}

export const ShowTask: FC<ShowTaskProps> = ({ task }) => {
  return (
    <div className={`${styles.showTask} ${task.id === 1 ? styles.one : ''}`}>
      <div className={styles.task}>
        <span className={styles.numberTask}>
          {task.id}
        </span>
        <span className={styles.textTask}>{task.task}</span>
      </div>
      <span
        
       className={styles.dropBtn}>
        <svg
          width="26"
          height="6"
          viewBox="0 0 26 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
      </span>
    </div>
  )
};


