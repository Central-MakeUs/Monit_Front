'use client';

import React, { ButtonHTMLAttributes } from 'react';
import * as styles from './PlusBtn.css';
import { IcPlus } from 'public/icons';

export const PlusBtn = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handleOnClick = () => {
    //TODO: report 페이지 이동 추가
    console.log('PlusButton clicked');
  };

  return (
    <button
      className={styles.button}
      onClick={handleOnClick}
      aria-label='add-expense'
      type='button'
      {...props}>
      <IcPlus className={styles.icon} />
    </button>
  );
};
