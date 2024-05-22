import { FC, memo, useEffect, useRef, useState } from 'react';
import styles from './ShowTask.module.css';
import { task, useTask } from '../../../store/useTask';
import { Dropdown } from '../../Dropdown';


interface ShowTaskProps {
  task: task
  index: number
}

export const ShowTask: FC<ShowTaskProps> = memo(({ task, index }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [activeEdit, setActiveEdit] = useState<boolean>(false)
  const active = useTask(state => state.activeTask)
  const addTask = useTask(state => state.addTask)
  const [value, setValue] = useState<string>(task.task)
  const { openDropdown, closeDropdown, isOpen } = useTask(state => ({
    isOpen: state.dropdowns[task.task],
    openDropdown: state.openDropdown,
    closeDropdown: state.closeDropdown,
  }))

  useEffect(() => {
    setValue(task.task)
    if (ref.current) {
      ref.current.focus()
      ref.current.select()
    }
  }, [task, activeEdit])

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    openDropdown(task.task)
    active(task)
    // setIsOpen(!isOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    addTask(value)
    setActiveEdit(false)
  }

  return (
    <>
      {/* <div className={`${styles.showTask} ${index === 0 ? styles.one : ''}`}> */}
      <div onClick={() => active(task)} className={`${styles.showTask} ${index === 0 ? styles.one : ''}`}>
        <div className={styles.task}>
          <span className={styles.numberTask}>
            {/* {task.id} */}
            {task.pomidor}
          </span>
          {/* <span className={styles.textTask}>{task.task}</span> */}
          <div>
            <span className={`${styles.textTask} ${activeEdit ? '' : styles.active}`}>{value}</span>
            <input
              className={`${styles.input} ${activeEdit ? styles.active : ''}`}
              ref={ref}
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
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
          {isOpen && <Dropdown onClose={() => closeDropdown(task.task)} task={task} change={() => setActiveEdit(true)} />}
        </span>
      </div>
    </>
  )
});


