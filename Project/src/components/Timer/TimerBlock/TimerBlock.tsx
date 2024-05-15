import { FC } from 'react';
import styles from './TimerBlock.module.css';
import { useTimerControl } from '../../../hooks/useTimerControl';
import { task } from '../../../store/useTask';
import { DEFAULT_TIME } from '../../../constants/DEFAULT_TIME';


interface TimerBlockProps {
  task: task
}

export const TimerBlock: FC<TimerBlockProps> = ({ task }) => {
  const { timer, paused, isRunning, stop, increment } = useTimerControl()
  const minute = Math.floor(timer / (1000 * 60) % 60)
  const second = Math.floor(timer / (1000) % 60)


  return (
    <div className={styles.timerBlock}>
      {/* <div className={`${styles.headerTime} `}> */}
      <div className={`${styles.headerTime} ${isRunning ? styles.red : styles.green}`}>
        <span className={styles.headerTitle}>
          {/* Сверстать сайт */}
          {task.task}
        </span>
        <span className={styles.headerTitle}>
          Помидор {task.pomidor}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.timer}>
          {/* <span className={`${styles.timerClock} `}> */}
          <span className={`${styles.timerClock} ${isRunning ? styles.red : styles.green}`}>
            {`${minute}:${second.toString().length === 1 ? `0${second}` : second}`}
          </span>
          {/* <span className={styles.timmerAdd}> */}
          <span onClick={() => increment()} className={styles.timmerAdd}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
            </svg>
          </span>
        </div>
        <div className={styles.tasks}>
          <span className={styles.taskNumber}>Задача - </span>
          <span className={styles.taskName}>{task.task}</span>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => paused()}
            className={styles.btnSucsess}>
            {timer === DEFAULT_TIME ? 'Старт' : isRunning ? 'Пауза' : 'Продолжить'}
          </button>
          <button disabled={timer === DEFAULT_TIME}
            onClick={() => stop()}
            className={`${styles.btnEnd} ${timer === DEFAULT_TIME ? styles.disabled : ''}`}>
            {timer !== DEFAULT_TIME ? 'Стоп' : isRunning ? 'Стоп' : 'Сделано'}
          </button>
        </div>
      </div>
    </div>
  )
};


