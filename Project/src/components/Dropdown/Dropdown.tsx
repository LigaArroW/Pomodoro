import React, { FC } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps { }

export const Dropdown: FC<DropdownProps> = () => {
  return (
    <div className={styles.dropdown}>
      Dropdown Component
    </div>
  )
};


