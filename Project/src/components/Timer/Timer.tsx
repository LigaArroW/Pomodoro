import { FC } from 'react';
import styles from './Timer.module.css';
import { TimerText } from './TimerText';
import { TimerBlock } from './TimerBlock';

interface TimerProps { }

export const Timer: FC<TimerProps> = () => {
  return (
    <div className={styles.timer}>
      <TimerText />
      <TimerBlock />
    </div>
  )
};


