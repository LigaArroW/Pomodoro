import { FC, useEffect, useState } from 'react';
import styles from './TimerBlock.module.css';
import { useTimerControl } from '../../../hooks/useTimerControl';

interface TimerBlockProps { }

export const TimerBlock: FC<TimerBlockProps> = () => {
  const { timer, paused } = useTimerControl()
  // const date = new Date(time)
  const minute = Math.floor(timer / (1000 * 60) % 60)
  const second = Math.floor(timer / (1000) % 60)


  return (
    <div className={styles.timerBlock}>
      <div className={styles.headerTime}>
        <span className={styles.headerTitle}>
          Сверстать сайт
        </span>
        <span className={styles.headerTitle}>
          Помидор 1
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.timer}>
          <span className={styles.timerClock}>
            {`${minute}:${second}`}
          </span>
          <span className={styles.timmerAdd}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white" />
            </svg>
          </span>
        </div>
        <div className={styles.tasks}>
          <span className={styles.taskNumber}>Задача 1 - </span>
          <span className={styles.taskName}>Сверстать сайт</span>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => paused()} className={styles.btnSucsess}>Пауза</button>
          <button className={styles.btnEnd}>Стоп</button>
        </div>
      </div>
    </div>
  )
};


