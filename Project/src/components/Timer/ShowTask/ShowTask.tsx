import { FC, useState } from 'react';
import styles from './ShowTask.module.css';
import { task, useTask } from '../../../store/useTask';
import { Dropdown } from '../../Dropdown';


interface ShowTaskProps {
  task: task
}

export const ShowTask: FC<ShowTaskProps> = ({ task }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const active = useTask(state => state.activeTask)
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()

    setIsOpen(!isOpen)
  }

  // console.log('render ShowTask');

  return (
    <>
      <div onClick={() => active(task)} className={`${styles.showTask} ${task.id === 1 ? styles.one : ''}`}>
        <div className={styles.task}>
          <span className={styles.numberTask}>
            {task.id}
          </span>
          <span className={styles.textTask}>{task.task}</span>
        </div>
        <span
          onClick={handleClick}
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
          {isOpen && <Dropdown onClose={() => setIsOpen(false)} task={task} />}
        </span>
      </div>
    </>
  )
};


