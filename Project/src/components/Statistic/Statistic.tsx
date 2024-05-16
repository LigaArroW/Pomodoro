import { FC, memo, useState } from 'react';
import styles from './Statistic.module.css';
import { Select } from '../Select';
import { OPTIONS_SELECT } from '../../constants/OPTIONS_SELECT';

interface StatisticProps { }

const initialOption = OPTIONS_SELECT[0];

export const Statistic: FC<StatisticProps> = memo(() => {
  const [option, setOption] = useState<{ value: string; label: string; }>(initialOption);

  console.log(option);
  console.log('render Statistic');
  

  return (
    <div className={styles.statistic}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваша активность</h2>
        <Select setOption={setOption} />
      </div>
    </div>
  );
});