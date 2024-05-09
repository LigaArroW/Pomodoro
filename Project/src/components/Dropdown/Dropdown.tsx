import { FC, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';
import { task, useTask } from '../../store/useTask';
import { DEFAULT_TIME } from '../../constants/DEFAULT_TIME';


interface DropdownProps {
  onClose: () => void
  task: task
}

export const Dropdown: FC<DropdownProps> = ({ onClose, task }) => {
  const ref = useRef(null)
  const removeTask = useTask(state => state.removeTask)
  const increment = useTask(state => state.inrement)
  const decrement = useTask(state => state.decrement)
  const editTask = useTask(state => state.editTask)
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    console.log(e.target);

    if (ref.current !== e.target) onClose()

  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    editTask(task)
  }
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    increment(task)
  }
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    decrement(task)
  }
  const handleRemoveTask = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeTask(task.id)
  }

  return (
    <div className={styles.dropdown} ref={ref}>
      <ul className={styles.list}>
        <li onClick={handleIncrement} className={styles.item}>
          <span className={styles.img}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.75 4.25H7.25V7.25H4.25V8.75H7.25V11.75H8.75V8.75H11.75V7.25H8.75V4.25ZM8 0.5C3.8675 0.5 0.5 3.8675 0.5 8C0.5 12.1325 3.8675 15.5 8 15.5C12.1325 15.5 15.5 12.1325 15.5 8C15.5 3.8675 12.1325 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z" fill="#A8B64F" />
            </svg>
          </span>
          <span className={styles.text}>Увеличить</span>
        </li>
        <li onClick={handleDecrement} className={`${styles.item} ${task.timer <= DEFAULT_TIME && styles.disabled}`}>
          <span className={styles.img}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <g clipPath="url(#clip0_35_150)">
                <path d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z" fill="#A8B64F" />
                <path d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z" fill="#A8B64F" />
              </g>
              <defs>
                <clipPath id="clip0_35_150">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className={styles.text}>Уменьшить</span>
        </li>
        <li onClick={handleEdit} className={styles.item}>
          <span className={styles.img}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.545 4.765L9.235 5.455L2.44 12.25H1.75V11.56L8.545 4.765ZM11.245 0.25C11.0575 0.25 10.8625 0.325 10.72 0.4675L9.3475 1.84L12.16 4.6525L13.5325 3.28C13.825 2.9875 13.825 2.515 13.5325 2.2225L11.7775 0.4675C11.6275 0.3175 11.44 0.25 11.245 0.25ZM8.545 2.6425L0.25 10.9375V13.75H3.0625L11.3575 5.455L8.545 2.6425Z" fill="#A8B64F" />
            </svg>
          </span>
          <span className={styles.text}>Редактировать</span>
        </li>
        <li className={styles.item} onClick={handleRemoveTask}>
          <span className={styles.img}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4.75V12.25H3V4.75H9ZM7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625L7.875 0.25ZM10.5 3.25H1.5V12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25Z" fill="#A8B64F" />
            </svg>
          </span>
          <span className={styles.text}>Удалить</span>
        </li>
      </ul>
    </div>
  )
};


