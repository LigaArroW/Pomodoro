import { FC, useCallback, useEffect, useState } from 'react';
import styles from './TimerBlock.module.css';
import { useTimerControl } from '../../../hooks/useTimerControl';
import { task, useTask } from '../../../store/useTask';
import { DEFAULT_TIME, MINUTE } from '../../../constants/DEFAULT_TIME';
import { useStatistic } from '../../../store/useStatisctic';


interface TimerBlockProps {
  task: task,
}

export const TimerBlock: FC<TimerBlockProps> = ({ task }) => {
  const [isRelax, setIsRelax] = useState(false)
  const [pomidor, setPomidor] = useState(1)
  const defTime = [DEFAULT_TIME, MINUTE * 5]
  const [taskDef, setTaskDef] = useState<task>(task)
  const { timer, control, isRunning } = useTimerControl(defTime, isRelax)
  const stat = useStatistic(state => state.editStatistic)
  const decrementPomidor = useTask(state => state.decrementPomidor)
  const removeTask = useTask(state => state.removeTask)
  const minute = Math.floor(timer / (1000 * 60) % 60)
  const second = Math.floor(timer / (1000) % 60)

  const handleDone = useCallback(() => {
    if (task.pomidor > 1 || (task.pomidor === 1 && isRelax)) setIsRelax(!isRelax)
    if (!isRelax) decrementPomidor(task)
    if ((task.pomidor === 1 && !isRelax) || (task.pomidor === pomidor && pomidor === 1 && !isRelax)) {
      removeTask(task.task)
    }
    control('done', task.pomidor)
    if (!isRelax) {
      stat('timeToJob', DEFAULT_TIME - timer)
    } else {
      setPomidor(prev => prev + 1)
    }
  }, [control, decrementPomidor, isRelax, pomidor, removeTask, stat, task, timer])

  useEffect(() => {
    if (taskDef.task !== task.task) {
      setIsRelax(false)
      setTaskDef(task)
      setPomidor(1)
    }
  }, [task, taskDef.task])

  useEffect(() => {
    if (timer <= 0) handleDone()
  }, [handleDone, timer])

  return (
    <>
      {task.task !== 'undefined'
        ?
        <div className={styles.timerBlock}>
          <div className={`${styles.headerTime} ${defTime.some(el => el === timer) ? '' : (!isRelax ? styles.red : styles.green)}`}>
            <span className={styles.headerTitle}>
              {task.task}
            </span>
            <span className={styles.headerTitle}>
              {isRelax ? 'Перерыв' : 'Помидор'} {pomidor}
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
        :
        <div className={`${styles.timerBlock} ${styles.noTask}`}>
          <div className={styles.noTaskText}>Нет активных задач</div>
          <div className={styles.noTaskImg}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM168 376c0 13.3 10.7 24 24 24H320c13.3 0 24-10.7 24-24s-10.7-24-24-24H192c-13.3 0-24 10.7-24 24zm-8-104c-26.5 0-48-21.5-48-48c0-14.3 6.3-27.2 16.2-36c-.2 1.3-.2 2.6-.2 4c0 17.7 14.3 32 32 32s32-14.3 32-32c0-1.4-.1-2.7-.2-4c10 8.8 16.2 21.7 16.2 36c0 26.5-21.5 48-48 48zm0 32a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm192-32c-26.5 0-48-21.5-48-48c0-14.3 6.3-27.2 16.2-36c-.2 1.3-.2 2.6-.2 4c0 17.7 14.3 32 32 32s32-14.3 32-32c0-1.4-.1-2.7-.2-4c10 8.8 16.2 21.7 16.2 36c0 26.5-21.5 48-48 48zm0 32a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
          </div>

        </div>
      }

    </>

  )
};


