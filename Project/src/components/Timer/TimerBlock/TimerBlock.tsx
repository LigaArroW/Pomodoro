import { FC, useEffect, useState } from 'react';
import styles from './TimerBlock.module.css';
import { useTimerControl } from '../../../hooks/useTimerControl';
import { task, useTask } from '../../../store/useTask';


interface TimerBlockProps {
  task: task
}

export const TimerBlock: FC<TimerBlockProps> = ({ task }) => {

  // const minute = Math.floor(timer / (1000 * 60) % 60)
  // const second = Math.floor(timer / (1000) % 60)
  // const increment = useTask(state => state.inrementTime)

  useEffect(() => {

  })

  

  return (
    <div className={styles.timerBlock}>
      <div className={`${styles.headerTime} `}>
      {/* <div className={`${styles.headerTime} ${!isPaused ? styles.red : styles.green}`}> */}
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
          <span className={`${styles.timerClock} `}>
          {/* <span className={`${styles.timerClock} ${!isPaused ? styles.red : styles.green}`}> */}
            {/* {`${minute}:${second.toString().length === 1 ? `0${second}` : second}`} */}
            00:00
          </span>
          <span className={styles.timmerAdd}>
          {/* <span onClick={() => increment(task)} className={styles.timmerAdd}> */}
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
          {/* <button onClick={handlePause} className={styles.btnSucsess}>{isPaused ? 'Пауза' : 'Старт'}</button>
          <button onClick={handleStop} className={styles.btnEnd}>Стоп</button> */}
        </div>
      </div>
    </div>
  )
};


