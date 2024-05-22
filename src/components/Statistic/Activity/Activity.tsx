import { FC } from 'react';
import styles from './Activity.module.css';
import { useStatistic } from '../../../store/useStatisctic';
import { timeFormat } from '../../../utils/timeFormat';

interface ActivityProps { }

export const Activity: FC<ActivityProps> = () => {
  const curentDay = useStatistic(state => state.curentDay)
  const dayWeek = curentDay[0] ? new Date(curentDay[0].date
    .split('.')
    .reverse()
    .join('-')) : undefined


  return (
    <div className={styles.activity}>
      <div className={styles.dayActivity}>
        <h2 className={styles.title}>
          {dayWeek && dayWeek.toLocaleDateString('ru-RU', { weekday: 'long' })}
        </h2>
        <p className={styles.descript}>Вы работали над задачами в течении
          <span className={styles.time}> {curentDay[0] ? timeFormat(curentDay[0].timeToJob) : 'Нет данных'}</span>
        </p>
      </div>

      <div className={`${styles.pomidors} ${curentDay.length > 0 ? styles.yes : ''}`}>
        {curentDay[0]
          ?
          <>
            <div className={styles.pomidorBlock}>
              <img src="/Pomodoro/public/tomato_1.svg" className={styles.pomidorYes} />
              <span className={styles.pomidorTask}>x {curentDay[0].pomidors}</span>
            </div>
            <span className={styles.pomidorText}>{curentDay[0].pomidors} помидора</span>
          </>
          :
          <img src="/Pomodoro/public/tomato_2.svg" className={styles.pomidorNo} />
        }

      </div>



    </div>
  )
};


