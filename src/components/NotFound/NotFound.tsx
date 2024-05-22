import { FC } from 'react';
import styles from './NotFound.module.css';

interface NotFoundProps { }

export const NotFound: FC<NotFoundProps> = () => (
  <>
    <h1 className={styles.error}>404 — страница не найдена</h1>
  </>
);


