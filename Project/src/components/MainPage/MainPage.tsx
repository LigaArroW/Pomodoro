import { FC } from 'react';
import styles from './MainPage.module.css';
import { TimerText } from './TimerText';

interface MainPageProps { }

export const MainPage: FC<MainPageProps> = () => (
  <div className={styles.mainPage}>
    <TimerText />
  </div>
);


