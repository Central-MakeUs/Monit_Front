import React from 'react';
import { Text } from '../text';
import { vars } from '../theme.css';
import * as styles from './DateInfoField.css';
import { IcRightChevron } from 'public/icons';

interface DateInfoFieldProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export const DateInfoField = ({ label, value, onClick }: DateInfoFieldProps) => {
  return (
    <div className={styles.fieldWrapper} onClick={onClick}>
      <Text variant='b3' color={vars.color.text.secondary}>
        {label}
      </Text>
      <div className={styles.dateWrapper}>
        <Text variant='b3' color={vars.color.text.primary}>
          {value}
        </Text>
        {onClick && <IcRightChevron color={vars.color.icon.tertiary} />}
      </div>
    </div>
  );
};
