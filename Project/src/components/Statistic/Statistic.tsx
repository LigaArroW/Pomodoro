import { FC } from 'react';
import styles from './Statistic.module.css';
import ReactSelect, { OnChangeValue, Options } from 'react-select';
import { OPTIONS_SELECT } from '../../constants/OPTIONS_SELECT';

interface StatisticProps { }

export const Statistic: FC<StatisticProps> = () => {

  const handleChange = (e: OnChangeValue<{ value: string; label: string; }, false>) => {
    console.log(e)
  }

  return (
    <div className={styles.statistic}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваша активность</h2>
        <ReactSelect
          className={styles.select}
          options={OPTIONS_SELECT}
          defaultValue={OPTIONS_SELECT[0]}
          onChange={handleChange}
        />
      </div>
    </div>
  )
};


