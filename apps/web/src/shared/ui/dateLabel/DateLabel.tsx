import React from 'react';
import * as styles from './DateLabel.css';
import { IcMonth } from 'public/icons';
import { Text } from '../text';
import { vars } from '../theme.css';

interface DateLabelProps {
  date: string; // 서버에서 "YYYY-MM-DD" 형식으로 옴
}

export const DateLabel = ({ date }: DateLabelProps) => {
  const [year, month, day] = date.split('-');

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <IcMonth className={styles.icon} />
      </div>
      <Text variant='b3' color={vars.color.text.primary}>
        {`${year}년 ${Number(month)}월 ${Number(day)}일`}
      </Text>
    </div>
  );
};
