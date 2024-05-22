import { FC, useState } from 'react';
import styles from './Statistic.module.css';
import { Select } from '../Select';
import { OPTIONS_SELECT } from '../../constants/OPTIONS_SELECT';
import { Activity } from './Activity';
import { Graf } from './Graf';
import { FooterStatic } from './FooterStatic';


interface StatisticProps { }


export const Statistic: FC<StatisticProps> = () => {
  const [option, setOption] = useState<{ value: string; label: string; }>(OPTIONS_SELECT[0]);


  return (
    <div className={styles.statistic}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваша активность</h2>
        <Select setOption={setOption} optionDef={option} />
      </div>
      <div className={styles.main}>
        <Activity />
        <Graf value={Number(option.value.split('-')[0])} />
      </div>
      <div className={styles.footer}>
        <FooterStatic />
      </div>
    </div>
  );
};