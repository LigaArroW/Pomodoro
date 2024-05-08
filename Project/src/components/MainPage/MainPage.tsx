import { FC, ReactNode } from 'react';
import styles from './MainPage.module.css';


interface MainPageProps {
  children: ReactNode
}

export const MainPage: FC<MainPageProps> = ({ children }) => {
  // console.log('render MainPage');
  
  return (
    <div className={styles.mainPage}>
      {children}
    </div>
  )
};


