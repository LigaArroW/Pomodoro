import { FC } from 'react';
import styles from './Statistic.module.css';

interface StatisticProps { }

export const Statistic: FC<StatisticProps> = () => {
  return (
    <div className={styles.statistic}>
      Statistic Component
    </div>
  )
};


