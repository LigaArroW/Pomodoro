import { FC } from 'react';
import styles from './Statistic.module.css';

interface StatisticProps { }

export const Statistic: FC<StatisticProps> = () => {
  return (
    <div className={styles.statistic}>
     <div className={styles.header}>
      <h2 className={styles.title}>Ваша активность</h2>
     </div>
    </div>
  )
};


