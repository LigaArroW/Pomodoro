import { FC, useCallback, useEffect, useState } from 'react';
import styles from './TimerBlock.module.css';
import { useTimerControl } from '../../../hooks/useTimerControl';
import { task, useTask } from '../../../store/useTask';
import { DEFAULT_TIME, MINUTE } from '../../../constants/DEFAULT_TIME';
import { useStatistic } from '../../../store/useStatisctic';


interface TimerBlockProps {
  task: task
}

export const TimerBlock: FC<TimerBlockProps> = ({ task }) => {
  const [isRelax, setIsRelax] = useState(false)
  const defTime = [DEFAULT_TIME, 3 * 1000]
  const { timer, control, isRunning } = useTimerControl(defTime, isRelax)
  const stat = useStatistic(state => state.editStatistic)
  const decrementPomidor = useTask(state => state.decrementPomidor)
  const removeTask = useTask(state => state.removeTask)
  const minute = Math.floor(timer / (1000 * 60) % 60)
  const second = Math.floor(timer / (1000) % 60)

  const handleDone = useCallback(() => {
    decrementPomidor(task)

    if (task.pomidor > 1) setIsRelax(!isRelax)
    if (task.pomidor === 1) {
      removeTask(task.task)
    }
    control('done')
    if (!isRelax) stat('timeToJob', DEFAULT_TIME - timer)
  }, [control, decrementPomidor, isRelax, removeTask, stat, task, timer])

  useEffect(() => {
    if (timer <= 0) handleDone()
  }, [handleDone, timer])

  return (
    <div className={styles.timerBlock}>
      <div className={`${styles.headerTime} ${defTime.some(el => el === timer) ? '' : (!isRelax ? styles.red : styles.green)}`}>
        <span className={styles.headerTitle}>
          {task.task}
        </span>
        <span className={styles.headerTitle}>
          {isRelax ? 'Перерыв' : 'Помидор'} {task.pomidor}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.timer}>
          <span className={`${styles.timerClock} ${defTime.some(el => el === timer) ? '' : (!isRelax ? styles.red : styles.green)}`}>
            {`${minute}:${second.toString().length === 1 ? `0${second}` : second}`}
          </span>
          <span onClick={() => control('increment')} className={styles.timmerAdd}>
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
          <button onClick={() => isRunning ? control('pause') : control('start')}
            className={styles.btnSucsess}>
            {defTime.some(el => el === timer) ? 'Старт' : isRunning ? 'Пауза' : 'Продолжить'}
          </button>
          {
            isRunning
              ?
              <button
                onClick={() => isRelax ? handleDone() : control('stop')}
                className={`${styles.btnEnd}`}>
                {isRelax ? 'Пропустить' : 'Стоп'}
              </button>
              :
              <button disabled={timer === DEFAULT_TIME}
                onClick={() => handleDone()}
                className={`${styles.btnEnd} ${timer === DEFAULT_TIME ? styles.disabled : ''}`}>
                {timer === DEFAULT_TIME ? 'Стоп' : isRelax ? 'Пропустить' : 'Сделано'}
              </button>
          }
        </div>
      </div>
    </div >
  )
};


