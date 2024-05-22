import { FC } from 'react';
import styles from './FooterStatic.module.css';
import { useStatistic } from '../../../store/useStatisctic';
import { timeFormat } from '../../../utils/timeFormat';

interface FooterStaticProps { }

export const FooterStatic: FC<FooterStaticProps> = () => {
  const curentDay = useStatistic(state => state.curentDay)
  const haveCurent = curentDay.length > 0

  return (
    <div className={styles.footerStatic}>
      <div className={`${styles.focus} ${haveCurent ? '' : styles.noActive}`}>
        <div className={styles.block}>
          <p className={styles.title}>Фокус</p>
          <p className={styles.result}>{
            (haveCurent && curentDay[0].pomidors !== 0)
              ?
              ((haveCurent && curentDay[0].timeToPause === 0 && curentDay[0].timeToJob > 0)
                ?
                '100 %'
                :
                ((curentDay[0].timeToJob / (curentDay[0].timeToPause + curentDay[0].timeToJob)) * 100).toFixed(0) + ' %'
              )
              :
              '0 %'
          }</p>
        </div>
        <svg className={`${haveCurent ? '' : styles.noActive}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C36.7893 20 20 36.7893 20 57.5C20 78.2107 36.7893 95 57.5 95Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M57.5 78C68.8218 78 78 68.8218 78 57.5C78 46.1782 68.8218 37 57.5 37C46.1782 37 37 46.1782 37 57.5C37 68.8218 46.1782 78 57.5 78Z" stroke="#FFAE35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div className={`${styles.pause} ${(haveCurent && curentDay[0].timeToPause > 0) ? '' : styles.noActive}`}>
        <div className={styles.block}>
          <p className={styles.title}>Время на паузе</p>
          <p className={styles.result}>{(haveCurent && curentDay[0].timeToPause > 0) ? timeFormat(curentDay[0].timeToPause, true) : '0м'}</p>
        </div>
        <svg className={`${(haveCurent && curentDay[0].timeToPause > 0) ? '' : styles.noActive}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#9C97D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M57.3154 30.1579V57.3158L70.8944 70.8947" stroke="#9C97D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div className={`${styles.stop} ${(haveCurent && curentDay[0].stops > 0) ? '' : styles.noActive}`}>
        <div className={styles.block}>
          <p className={styles.title}>Остановки</p>
          <p className={styles.result}>{(haveCurent && curentDay[0].stops > 0) ? curentDay[0].stops : '0'}</p>
        </div>
        <svg className={`${(haveCurent && curentDay[0].stops > 0) ? '' : styles.noActive}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#7FC2D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 20L95 94" stroke="#7FC2D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  )
};


